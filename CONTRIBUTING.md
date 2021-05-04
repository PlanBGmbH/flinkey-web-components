# Contributing to flinkey Web Components

Huge thanks for taking the time to contribute!

The following is a set of guidelines for contributing to flinkey Web Components.

#### Table Of Contents

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Pull Requests](#pull-requests)
  * [Semantic Versioning](#semantic-versioning)

[Styleguides](#styleguides)
  * [Branch Naming Conventions](#branch-naming-conventions)
  * [Git Commit Messages](#git-commit-messages)
  * [JavaScript Styleguide](#javascript-styleguide)
  * [Specs Styleguide](#specs-styleguide)

[Additional Notes](#additional-notes)
  * [Issue and Pull Request Labels](#issue-and-pull-request-labels)

## How Can I Contribute?

### Reporting Bugs

When you are creating a bug report, please fill out [the required template](https://github.com/PlanBGmbH/flinkey-web-components/blob/main/.github/ISSUE_TEMPLATE/bug_report.md), the information it asks for helps us resolve issues faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Before Submitting A Bug Report

* You might be able to find the cause of the problem and fix things yourself. Most importantly, check if you can reproduce the problem when using the latest version of flinkey Web Components.
* Check if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

### Suggesting Enhancements

When you are creating an enhancement suggestion, please fill in [the template](https://github.com/PlanBGmbH/flinkey-web-components/blob/main/.github/ISSUE_TEMPLATE/feature_request.md).

#### Before Submitting An Enhancement Suggestion

* Check if you're using the latest version of flinkey Web Components.
* Check if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

### Pull Requests

The process described here has several goals:

- Maintain the quality of the flinkey Web Components
- Fix problems that are important to users

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](https://github.com/PlanBGmbH/flinkey-web-components/blob/main/.github/pull_request_template.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing.

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

### Semantic Versioning

Please update the version of the flinkey Web Components library when changing any code located in the components project directory. To do so please execute one of the following commands in the components project directory:

```bash
npm version major
```

```bash
npm version minor
```

```bash
npm version patch
```

## Styleguides

### Branch Naming Conventions

#### Branch Types

Please choose one of the following types of branches that fits your changes:

* feature: adding new functionality
* bugfix: fixing a bug in production code
* hotfix: fixing a critical bug in production code
* docs: changing the docs
* style: changing code style (e.g. adding missing semicolons etc.)
* refactor: refactoring production code
* test: changing/refactoring tests
* chore: changing CI/CD or configuration files

#### Branch Naming

Please find the branch naming format below:

```
<branch-type>/<issue-number>-<issue-title-separated-by-hyphens>
```

Sample usage:

```
feature/10-add-product-overview
```

### Git Commit Messages

Please start the commit message with an applicable emoji (see [gitmoji](https://gitmoji.dev/)).

### Component Styleguide

All component code is linted with [Prettier](https://prettier.io/).

Place class properties in the following order:
* Public members
* Private members
* Public methods
* Private methods

### Specs Styleguide

- Include sophisticated [Jest](https://jestjs.io/)/[Puppeteer](https://pptr.dev/) specs in the corresponding `<component-name>.e2e.ts` spec file(s) of the component(s).
- Treat `describe` as a noun or situation.
- Treat `it` as a statement about state or how an operation changes state.

#### Example

```js
describe('a dog', () => {
  it('barks', () => {
    // spec here
  });

  describe('when the dog is happy', () => {
    it('wags its tail', () => {
      // spec here
    });
  });
});
```

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

#### Type of Issue and Issue State

| Label name | Description |
| --- | --- |
| `enhancement` | Feature requests. |
| `bug` | Confirmed bugs or reports that are very likely to be bugs. |
| `question` | Questions more than bug reports or feature requests (e.g. how do I do X). |
| `help-wanted` | The flinkey Web Components team would appreciate help from the community in resolving these issues. |
| `more-information-needed` | More information needs to be collected about these problems or feature requests (e.g. steps to reproduce). |
| `needs-reproduction` | Likely bugs, but haven't been reliably reproduced. |
| `duplicate` | Issues which are duplicates of other issues, i.e. they have been reported before. |
| `wontfix` | The flinkey Web Components team has decided not to fix these issues. |
| `invalid` | Issues which aren't valid (e.g. user errors). |

#### Pull Request Labels

| Label name | Description |
| --- | --- |
| `work-in-progress` | Pull requests which are still being worked on, more changes will follow. |
| `needs-review` | Pull requests which need code review and approval from flinkey Web Components team. |
| `under-review` | Pull requests being reviewed by flinkey Web Components team. |
| `requires-changes` | Pull requests which need to be updated based on review comments and then reviewed again. |
| `needs-testing` | Pull requests which need manual testing. |
