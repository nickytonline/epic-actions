const github = require('@actions/github');
const core = require('@actions/core');
const { context } = require('@actions/github/lib/utils');
const repoToken = core.getInput('repo-token');
const octokit = github.getOctokit(repoToken);

async function run(){
    try {
        const ctx = github.context;
        const author = ctx.payload.pull_request?.user?.login ?? '';
        if(await isFirstPull(author)){
            await addLabel(ctx.payload.pull_request?.number,'first-pull-request');
            core.info('Ready to Tweet!');
        }
    } catch(error){
        if(error instanceof Error) core.setFailed(error.message);
    }
}
async function isFirstPull(login){
    const {owner, repo} = context.repo;
    const {data: result} = await octokit.rest.search.issuesAndPullRequests({
        q:`owner:${owner} repo:${repo} is:pull-request state:all author:${login}`,
        per_page:5
    });
    core.info(JSON.stringify(result,null,"\t"))
    return result.totalCount <= 1;
}
async function addLabel(number,name){
    await octokit.rest.issues.addLabels({
        ...context.repo,
        issue_number: number,
        labels: [ { name } ]
    })
}
run();