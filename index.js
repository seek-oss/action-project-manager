const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const project = core.getInput('project');
        console.log(`Project: ${project}`);

        const payload = JSON.stringify(github.context.payload, undefined, 2);
        console.log(`Payload: ${payload}`);

        const token = core.getInput('token');
        const api = new github.GitHub(token);

        // const restult = await api.projects.createCard({
        //     content_id: payload.id
        // });

        const result = await api.projects.listForOrg({
            org: 'SEEK-Jobs'
        });
        
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