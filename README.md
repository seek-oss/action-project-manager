# Project Manager github action

A github action which labels and adds all issues and pull requests to columns on a project board. In order to configure this action you'll need to retrieve the id of the project columns you'd like to add issues and pull requests to. You can locate the id of a project column in the UI by clicking the `...` link in the top right corner of the column and choosing "copy column link". The numberic sequence in the link URL (after the `-**) is the column ID.

## Inputs

### issueColumnId

**Required** The ID of the project column to add all new issues. 

### pullRequestColumnId

**Required** The ID of the project column to add pull requests to. 

### token

**Required** The github API token to use when calling the github API to add issues and pull requests to the project. If the project board you are targetting belongs to the same repo as your workflow you can simply use the built-in [GITHUB_TOKEN](https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#github_token-secret) secret. If the project is external to the repo, such as an org level project, you will need to generate an access token with the necessary scopes, and provide it via [a workflow secret](https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables).


## Example usage

```yml
on:
  issues:
    types: [opened]
  pull_request:
    types: [opened]

jobs:
  add_to_project:
    runs-on: ubuntu-latest
    name: A job to organise issues
    steps:
      - name: Assign to project
        id: organise
        uses: seek-oss/action-project-manager@master
        with:
          issueColumnId: '12345'
          pullRequestColumnId: '67890'
          token: '${{ secrets.PROJECT_MANAGER_ACTION_TOKEN }}'
```
