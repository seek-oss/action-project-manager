const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('token');
        const columnId = core.getInput('columnId');
        const labels = core.getInput('labels');

        if (isPullRequest(github.context.payload) || isIssue(github.context.payload)) {
            const api = new github.GitHub(token);

            // Ensure all labels exists
            for (var label of labels) {
                const existing = await api.issues.getLabel({
                    owner: github.context.payload.repository.owner.login,
                    repo: github.context.payload.repository.name,
                    name: label
                });

                console.log(`existing:  ${JSON.stringify(existing)}`);
            }


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

// octokit.issues.addLabels({
//     owner,
//     repo,
//     issue_number,
//     labels
// })

// octokit.issues.createLabel({
//     owner,
//     repo,
//     name,
//     color
// })

// octokit.issues.getLabel({
//     owner,
//     repo,
//     name
// })
