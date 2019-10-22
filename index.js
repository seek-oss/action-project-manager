const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('token');
        const columnId = core.getInput('columnId');
        const labels = core.getInput('labels');
        const payload = JSON.stringify(github.context.payload, undefined, 2);
        console.log(`Payload: ${payload}`);

        const api = new github.GitHub(token);
        const contentType = (github.context.payload.issue != null ? 'Issue' : 'PullRequest');

        const params = {
            content_id: github.context.payload.id,
            column_id: columnId,
            content_type: contentType
        };

        console.log(`params: ${JSON.stringify(params, undefined, 2)}`);

        const result = await api.projects.createCard(params);

        console.log(`Projects: ${JSON.stringify(result)}`);

    } catch(error) {
        core.setFailed(error.message);
    }
}

run();


// {
//     "assignee": null,
//     "assignees": [],
//     "author_association": "COLLABORATOR",
//     "body": "",
//     "closed_at": null,
//     "comments": 0,
//     "comments_url": "https://api.github.com/repos/SEEK-Jobs/paved-road/issues/1/comments",
//     "created_at": "2019-10-22T00:50:08Z",
//     "events_url": "https://api.github.com/repos/SEEK-Jobs/paved-road/issues/1/events",
//     "html_url": "https://github.com/SEEK-Jobs/paved-road/issues/1",
//     "id": 510372708,
//     "labels": [],
//     "labels_url": "https://api.github.com/repos/SEEK-Jobs/paved-road/issues/1/labels{/name}",
//     "locked": false,
//     "milestone": null,
//     "node_id": "MDU6SXNzdWU1MTAzNzI3MDg=",
//     "number": 1,
//     "repository_url": "https://api.github.com/repos/SEEK-Jobs/paved-road",
