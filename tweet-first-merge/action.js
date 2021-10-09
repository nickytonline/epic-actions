const github = require('@actions/github');
const core = require('@actions/core');

async function run(){
    const repoToken = core.getInput('repo-token');
    const octokit = github.getOctokit(repoToken);
    core.info(JSON.stringify(octokit,null,"\t"))
}

run();