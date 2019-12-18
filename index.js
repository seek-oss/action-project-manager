const core = require('@actions/core');
const github = require('@actions/github');
const {Toolkit} = require('actions-toolkit');

const tools = new Toolkit();

const contentTypePullRequest = 'PullRequest';
const contentTypeIssue = 'Issue';

async function run() {
    try {
        const token = core.getInput('token');
        const issueColumnId = core.getInput('issueColumnId');
        const pullRequestColumnId = core.getInput('pullRequestColumnId');
        const payload = github.context.payload;
        const api = new github.GitHub(token);

        tools.github.issues.addAssignees

        if (isPullRequest(payload)) {
            tools.log.info('Processing pull request', payload.pull_request.html_url)
            return await api.projects.createCard({
                column_id: pullRequestColumnId,
                content_id: payload.pull_request.id,
                content_type: contentTypePullRequest
            });
        }

        if (isIssue(payload)) {
            tools.log.info('Processing issue', payload.issue.html_url)
            return await api.projects.createCard({
                column_id: issueColumnId,
                content_id: payload.issue.id,
                content_type: contentTypeIssue
            });
        }
    } catch (error) {
        tools.log.error('MessageType::::', typeof error)
        if (error.message == 'Project already has the associated issue') {
            tools.log.info('Project already has associated card')
            return
        }
        core.setFailed(error.message);
    }
}

const isPullRequest = payload =>
      payload.pull_request != null;

const isIssue = payload =>
      payload.issue != null;

run();
