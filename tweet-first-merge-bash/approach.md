## References
[pull_request_target event](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#pull_request_target)
[Creating a composite action](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action)\
[first-interaction](https://github.com/)
[matt's cheat codes, lol](https://github.com/nickytonline/epic-actions/issues/4#issuecomment-941482762)

## Action Approach

We need to gather a few things:
1) Is this PR the first on this repo from the user?
2) Does the user have a `twitter_username` on their profile?
3) Need the template message, and secrets for tweet action

## Workflow File
This should use pull_request_target event
It should make sure the PR is merged, but we may turn this off for testing

## Action YML File
This would get referred to by: nickytonline/epic-actions/tweet-first-merge-bash@tweet-first-merge-bash

## Stuff we could use
Action: devigned/go-twitter-action@v1.0.2
Action: actions/first-interaction
CLI's:
    curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/users/$LOGIN | jq .twitter_username | tr -d \"
    jq .total_count <= 1
    sed
    echo "::set-output name=NAME::$VALUE"

## Docs we need
- defining a twitter app with secrets and stuff (how to)
- make sure you're using an app that has permissions for the account you want to use
- example workflow file
