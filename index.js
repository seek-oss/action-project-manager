const core = require('@actions/core');
const github = require('@actions/github');

try {
    const project = core.getInput('project');
    console.log(`Project: ${project}`);

    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`Payload: ${payload}`);

} catch(error) {
    core.setFailed(error.message);
}
