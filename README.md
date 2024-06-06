# Pearl

## Running the suite with Github Actions:
1. Navigate to https://github.com/Loop-STS/Pearl/actions/workflows/pearl-suite.yml
2. From the top right menu within the table containing the workflow runs, click the "Run Workflow" dropdown.
3. To initiate the run, click the green "Run Workflow" button.

At this point, you should receive a success message letting you know the workflow has been requested successfully. If you refresh the page, you should see a new workflow run appear in the table, indicated as "In Progress" with an orange dot next to it. You can click the name of the running workflow to watch it work through the steps.

The summary page provides a high level overview of the workflow as a whole. From the side menu you can check on the individual jobs to see their progress and logs. You can also click into any of the jobs from the graphical representation of the workflow to get more details.

Once the workflow has completed, a link to the report will be available at a URL that is displayed in the "Merge Reports" job in the summary graphic. Typically it will be: https://refactored-fiesta-c433e02f.pages.github.io/. Following this link will take you to the full report.

## Running the Smoke Tests:
1. Navigate to https://github.com/Loop-STS/Pearl/actions/workflows/pearl-smoke.yml
2. From the top right menu within the table containing the workflow runs, click the "Run Workflow" dropdown.
3. The smoke tests default to run on the staging environment. To run them against dev, select "dev" from the environment dropdown.
4. To initiate the run, click the green "Run Workflow" button.
Please note that the smoke test workflow will not publish the HTML report to the normal URL since Github pages only allows us one domain per repo. The report is still available as an artifact to download, but we can also view the logs of the run directly to deduce any failures.

## Running the suite using the Github CLI:
This method assumes you have the appropriate access to the repository and have the Github CLI installed and authenticated. If you do not have the Github CLI installed, you can follow the instructions here: https://cli.github.com/manual/installation

Run the workflow using the following command:
```bash
gh workflow run [<workflow-id> | <workflow-name>] [flags]
```
To get a menu of workflow options, simply do:
```bash
gh workflow run --repo Loop-STS/Pearl
```
This will list all of the workflows available to run.

To specify a workflow, you can use the workflow name or the workflow id.
For example, if we wanted to run the main suite, we could do:
```bash
gh workflow run --repo Loop-STS/Pearl pearl-suite.yml
```
To run the smoke tests, we could do:
```bash
gh workflow run --repo Loop-STS/Pearl pearl-smoke.yml
```
This will default to run against staging. To run against dev:
```bash
gh workflow run --repo Loop-STS/Pearl pearl-smoke.yml -f environment=dev
```
To view the status of the workflow run, you can do:
```bash
gh workflow view --repo Loop-STS/Pearl <workflow-file-name>
```

## Report Interpretation
### Overall Summary
The link will take you to a published GitHub page with the complete results from the run. At the very top of the page, you can see the run by the numbers: passes, fails, and skips.

The results of the report are sorted into containers based on the file the test is in. You can expand or collapse these containers by clicking the header of the container. The header shows which file the tests were in, and how long the whole file took to run. Each test within the file also has a runtime listed on the right side.

### Filtering the results
You can filter the report by status by clicking on any of the categories at the top of the page, which will load a filtered list which only has the tests that passed/failed/skipped.

### Viewing specific tests
You can open a detailed view of each test by clicking on the test name. You can then explore the tests errors as well as expand each step of the test to see the code for that step and how long each step took to run.

Each test should have an annotation on this details page that describes what the test does and what it expects.

Currently, the suite is set to record videos, screenshots, and a trace file when a test fails. You can access this data below the test steps. The trace can be particularly useful tool for understanding where and why a test fails as it includes snapshots of the UI, network calls, console output, and a trace of each test step. More information can be found here: https://playwright.dev/docs/trace-viewer

