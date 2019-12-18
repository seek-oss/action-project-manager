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

        if (isPullRequest(payload)) {
            tools.log.info('Processing pull request')
            const { data: res } = await api.projects.createCard({
                column_id: pullRequestColumnId,
                content_id: payload.pull_request.id,
                content_type: contentTypePullRequest
            });
            tools.log.info('Result', res)
            return
        }

        if (isIssue(payload)) {
            tools.log.info('Processing issue')
            const res = await api.projects.createCard({
                column_id: issueColumnId,
                content_id: payload.issue.id,
                content_type: contentTypeIssue
            });
            tools.log.info('Result', res)
            return
        }
    } catch(error) {
        tools.log.error('Error occurred', error)
        core.setFailed(error.message);
    }
}

const isPullRequest = payload =>
      payload.pull_request != null;

const isIssue = payload =>
      payload.issue != null;

run();
