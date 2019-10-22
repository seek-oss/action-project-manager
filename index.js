const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('token');
        const columnId = core.getInput('columnId');

        if (isPullRequest(github.context.payload) || isIssue(github.context.payload)) {
            const api = new github.GitHub(token);

            return await api.projects.createCard({
                column_id: columnId,
                content_id: contentId(github.context.payload),
                content_type: contentType(github.context.payload)
            });
        }

    } catch(error) {
        core.setFailed(error.message);
    }
}

const isPullRequest = payload =>
      payload.pull_request != null;

const isIssue = payload =>
      payload.issue != null;

const contentId = payload =>
      isIssue(payload) ? payload.issue.id : (isPullRequest(payload) ? payload.pull_request.id : '');

const contentType = payload =>
      isIssue(payload) ? 'Issue' : (isPullRequest(payload) ? 'PullRequest' : '');

run();
