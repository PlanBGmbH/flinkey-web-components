# Contributing to Atom

Huge thanks for taking the time to contribute!

The following is a set of guidelines for contributing to flinkey Web Components.

#### Table Of Contents

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Pull Requests](#pull-requests)

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

[GitHub search](https://help.github.com/articles/searching-issues/) makes it easy to use labels for finding groups of issues or pull requests you're interested in. To help you find issues and pull requests, each label is listed with search links for finding open items with that label. We  encourage you to read about [other search filters](https://help.github.com/articles/searching-issues/) which will help you write more focused queries.

#### Type of Issue and Issue State

| Label name | `atom/atom` :mag_right: | `atom`‑org :mag_right: | Description |
| --- | --- | --- | --- |
| `enhancement` | [search][search-atom-repo-label-enhancement] | [search][search-atom-org-label-enhancement] | Feature requests. |
| `bug` | [search][search-atom-repo-label-bug] | [search][search-atom-org-label-bug] | Confirmed bugs or reports that are very likely to be bugs. |
| `question` | [search][search-atom-repo-label-question] | [search][search-atom-org-label-question] | Questions more than bug reports or feature requests (e.g. how do I do X). |
| `feedback` | [search][search-atom-repo-label-feedback] | [search][search-atom-org-label-feedback] | General feedback more than bug reports or feature requests. |
| `help-wanted` | [search][search-atom-repo-label-help-wanted] | [search][search-atom-org-label-help-wanted] | The Atom core team would appreciate help from the community in resolving these issues. |
| `more-information-needed` | [search][search-atom-repo-label-more-information-needed] | [search][search-atom-org-label-more-information-needed] | More information needs to be collected about these problems or feature requests (e.g. steps to reproduce). |
| `needs-reproduction` | [search][search-atom-repo-label-needs-reproduction] | [search][search-atom-org-label-needs-reproduction] | Likely bugs, but haven't been reliably reproduced. |
| `duplicate` | [search][search-atom-repo-label-duplicate] | [search][search-atom-org-label-duplicate] | Issues which are duplicates of other issues, i.e. they have been reported before. |
| `wontfix` | [search][search-atom-repo-label-wontfix] | [search][search-atom-org-label-wontfix] | The Atom core team has decided not to fix these issues for now, either because they're working as intended or for some other reason. |
| `invalid` | [search][search-atom-repo-label-invalid] | [search][search-atom-org-label-invalid] | Issues which aren't valid (e.g. user errors). |
| `package-idea` | [search][search-atom-repo-label-package-idea] | [search][search-atom-org-label-package-idea] | Feature request which might be good candidates for new packages, instead of extending Atom or core Atom packages. |

#### Pull Request Labels

| Label name | `atom/atom` :mag_right: | `atom`‑org :mag_right: | Description
| --- | --- | --- | --- |
| `work-in-progress` | [search][search-atom-repo-label-work-in-progress] | [search][search-atom-org-label-work-in-progress] | Pull requests which are still being worked on, more changes will follow. |
| `needs-review` | [search][search-atom-repo-label-needs-review] | [search][search-atom-org-label-needs-review] | Pull requests which need code review, and approval from maintainers or Atom core team. |
| `under-review` | [search][search-atom-repo-label-under-review] | [search][search-atom-org-label-under-review] | Pull requests being reviewed by maintainers or Atom core team. |
| `requires-changes` | [search][search-atom-repo-label-requires-changes] | [search][search-atom-org-label-requires-changes] | Pull requests which need to be updated based on review comments and then reviewed again. |
| `needs-testing` | [search][search-atom-repo-label-needs-testing] | [search][search-atom-org-label-needs-testing] | Pull requests which need manual testing. |

[search-atom-repo-label-enhancement]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aenhancement
[search-atom-org-label-enhancement]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aenhancement
[search-atom-repo-label-bug]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Abug
[search-atom-org-label-bug]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Abug
[search-atom-repo-label-question]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aquestion
[search-atom-org-label-question]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aquestion
[search-atom-repo-label-feedback]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Afeedback
[search-atom-org-label-feedback]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Afeedback
[search-atom-repo-label-help-wanted]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Ahelp-wanted
[search-atom-org-label-help-wanted]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Ahelp-wanted
[search-atom-repo-label-beginner]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Abeginner
[search-atom-org-label-beginner]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Abeginner
[search-atom-repo-label-more-information-needed]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Amore-information-needed
[search-atom-org-label-more-information-needed]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Amore-information-needed
[search-atom-repo-label-needs-reproduction]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aneeds-reproduction
[search-atom-org-label-needs-reproduction]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aneeds-reproduction
[search-atom-repo-label-triage-help-needed]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Atriage-help-needed
[search-atom-org-label-triage-help-needed]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Atriage-help-needed
[search-atom-repo-label-windows]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Awindows
[search-atom-org-label-windows]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Awindows
[search-atom-repo-label-linux]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Alinux
[search-atom-org-label-linux]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Alinux
[search-atom-repo-label-mac]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Amac
[search-atom-org-label-mac]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Amac
[search-atom-repo-label-documentation]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Adocumentation
[search-atom-org-label-documentation]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Adocumentation
[search-atom-repo-label-performance]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aperformance
[search-atom-org-label-performance]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aperformance
[search-atom-repo-label-security]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Asecurity
[search-atom-org-label-security]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Asecurity
[search-atom-repo-label-ui]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aui
[search-atom-org-label-ui]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aui
[search-atom-repo-label-api]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aapi
[search-atom-org-label-api]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aapi
[search-atom-repo-label-crash]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Acrash
[search-atom-org-label-crash]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Acrash
[search-atom-repo-label-auto-indent]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aauto-indent
[search-atom-org-label-auto-indent]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aauto-indent
[search-atom-repo-label-encoding]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aencoding
[search-atom-org-label-encoding]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aencoding
[search-atom-repo-label-network]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Anetwork
[search-atom-org-label-network]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Anetwork
[search-atom-repo-label-uncaught-exception]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Auncaught-exception
[search-atom-org-label-uncaught-exception]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Auncaught-exception
[search-atom-repo-label-git]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Agit
[search-atom-org-label-git]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Agit
[search-atom-repo-label-blocked]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Ablocked
[search-atom-org-label-blocked]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Ablocked
[search-atom-repo-label-duplicate]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aduplicate
[search-atom-org-label-duplicate]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aduplicate
[search-atom-repo-label-wontfix]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Awontfix
[search-atom-org-label-wontfix]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Awontfix
[search-atom-repo-label-invalid]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Ainvalid
[search-atom-org-label-invalid]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Ainvalid
[search-atom-repo-label-package-idea]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Apackage-idea
[search-atom-org-label-package-idea]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Apackage-idea
[search-atom-repo-label-wrong-repo]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Awrong-repo
[search-atom-org-label-wrong-repo]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Awrong-repo
[search-atom-repo-label-editor-rendering]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aeditor-rendering
[search-atom-org-label-editor-rendering]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aeditor-rendering
[search-atom-repo-label-build-error]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Abuild-error
[search-atom-org-label-build-error]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Abuild-error
[search-atom-repo-label-error-from-pathwatcher]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aerror-from-pathwatcher
[search-atom-org-label-error-from-pathwatcher]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aerror-from-pathwatcher
[search-atom-repo-label-error-from-save]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aerror-from-save
[search-atom-org-label-error-from-save]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aerror-from-save
[search-atom-repo-label-error-from-open]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aerror-from-open
[search-atom-org-label-error-from-open]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aerror-from-open
[search-atom-repo-label-installer]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Ainstaller
[search-atom-org-label-installer]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Ainstaller
[search-atom-repo-label-auto-updater]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Aauto-updater
[search-atom-org-label-auto-updater]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aauto-updater
[search-atom-repo-label-deprecation-help]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Aatom%2Fatom+label%3Adeprecation-help
[search-atom-org-label-deprecation-help]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Adeprecation-help
[search-atom-repo-label-electron]: https://github.com/search?q=is%3Aissue+repo%3Aatom%2Fatom+is%3Aopen+label%3Aelectron
[search-atom-org-label-electron]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Aatom+label%3Aelectron
[search-atom-repo-label-work-in-progress]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Aatom%2Fatom+label%3Awork-in-progress
[search-atom-org-label-work-in-progress]: https://github.com/search?q=is%3Aopen+is%3Apr+user%3Aatom+label%3Awork-in-progress
[search-atom-repo-label-needs-review]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Aatom%2Fatom+label%3Aneeds-review
[search-atom-org-label-needs-review]: https://github.com/search?q=is%3Aopen+is%3Apr+user%3Aatom+label%3Aneeds-review
[search-atom-repo-label-under-review]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Aatom%2Fatom+label%3Aunder-review
[search-atom-org-label-under-review]: https://github.com/search?q=is%3Aopen+is%3Apr+user%3Aatom+label%3Aunder-review
[search-atom-repo-label-requires-changes]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Aatom%2Fatom+label%3Arequires-changes
[search-atom-org-label-requires-changes]: https://github.com/search?q=is%3Aopen+is%3Apr+user%3Aatom+label%3Arequires-changes
[search-atom-repo-label-needs-testing]: https://github.com/search?q=is%3Aopen+is%3Apr+repo%3Aatom%2Fatom+label%3Aneeds-testing
[search-atom-org-label-needs-testing]: https://github.com/search?q=is%3Aopen+is%3Apr+user%3Aatom+label%3Aneeds-testing

[beginner]:https://github.com/search?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Abeginner+label%3Ahelp-wanted+user%3Aatom+sort%3Acomments-desc
[help-wanted]:https://github.com/search?q=is%3Aopen+is%3Aissue+label%3Ahelp-wanted+user%3Aatom+sort%3Acomments-desc+-label%3Abeginner
[contributing-to-official-atom-packages]:https://flight-manual.atom.io/hacking-atom/sections/contributing-to-official-atom-packages/
[hacking-on-atom-core]: https://flight-manual.atom.io/hacking-atom/sections/hacking-on-atom-core/