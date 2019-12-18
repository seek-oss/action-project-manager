const core = require('@actions/core');
const github = require('@actions/github');

const contentTypePullRequest = 'PullRequest';
const contentTypeIssue = 'Issue';

async function run() {
    console.log("Payload: " + github.context.payload);
    // try {
    //     const token = core.getInput('token');
    //     const issueColumnId = core.getInput('issueColumnId');
    //     const pullRequestColumnId = core.getInput('pullRequestColumnId');
    //     const payload = github.context.payload;
    //     const api = new github.GitHub(token);

    //     if (isPullRequest(payload)) {
    //         const { data: res } = await api.projects.createCard({
    //             column_id: pullRequestColumnId,
    //             content_id: payload.pull_request.id,
    //             content_type: contentTypePullRequest
    //         });
    //         console.log("Got: " + res)
    //         return
    //     }

    //     if (isIssue(payload)) {
    //         const res = await api.projects.createCard({
    //             column_id: issueColumnId,
    //             content_id: payload.issue.id,
    //             content_type: contentTypeIssue
    //         });
    //         console.log("Got: " + res)
    //         return
    //     }
    // } catch(error) {
    //     console.log("Error message: " + error.message + ", error: " + error)
    //     core.setFailed(error.message);
    // }
}

const isPullRequest = payload =>
      payload.pull_request != null;

const isIssue = payload =>
      payload.issue != null;

run();
