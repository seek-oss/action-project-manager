# Project Manager github action

A github action which labels and adds all issues and pull requests to a project board and column

## Inputs

### columnId

**Required** The ID of the project column to add all new issues and pull requests to. You can locate the ID of a project column in the UI by clicking the `...` link in the top right corner of the column and choosing "copy column link". The numberic sequence in the link URL (after the `-**) is the column ID.

### token

**Required** The github API token to use when calling the github API to add issues and pull requests to the project


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
          columnId: '4154706'
          token: '${{ secrets.PROJECT_MANAGER_ACTION_TOKEN }}'
```
