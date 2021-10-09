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
    const {owner,repo} = context.repo;
    const query = `org:${owner} is:pull-request state:all author:${login}`;
    core.info(query);
    const {data: result} = await octokit.rest.search.issuesAndPullRequests({
        q:query,
        per_page:5
    });
    core.info(JSON.stringify(result,null,"\t"));
    return result.total_count <= 1;
}
async function addLabel(number,name){
    await octokit.rest.issues.addLabels({
        ...context.repo,
        issue_number: number,
        labels: [ { name } ]
    })
}
run();