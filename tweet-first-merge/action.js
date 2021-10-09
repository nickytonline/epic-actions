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
            const twitterHandle = await getTwitterHandle(author);
            core.info(`Ready to Tweet @${twitterHandle}`);
        }
    } catch(error){
        if(error instanceof Error) core.setFailed(error.message);
    }
}
async function getTwitterHandle(login){
    const {data: {twitter_username}} = await octokit.rest.users.getByUsername({username:login});
    return twitter_username;
}
async function isFirstPull(login){
    const {owner,repo} = context.repo;
    const query = `repo:${owner}/${repo} is:pull-request author:${login}`;
    core.info(query);
    const {data: {total_count}} = await octokit.rest.search.issuesAndPullRequests({
        q:query,
        per_page:5
    });
    return total_count <= 1;
}
run();