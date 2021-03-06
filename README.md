# flinkey Web Components

[![Build & Publish Package](https://github.com/PlanBGmbH/flinkey-web-components/actions/workflows/Build_Publish.yml/badge.svg)](https://github.com/PlanBGmbH/flinkey-web-components/actions/workflows/Build_Publish.yml) [![npm version](https://badge.fury.io/js/@planbgmbh%2Fflinkey-web-components.svg)](https://badge.fury.io/js/@planbgmbh%2Fflinkey-web-components) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## Table of contents

- [Introduction](#introduction)
- [Getting started](#getting-started)
- [Contributing](#contributing)
- [Versioning](#versioning)

## Introduction

This project provides some [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) built for usage in combination with the [flinkey API](https://developers.flinkey.com/api/v3/getting-started/). The reason to build these collection of [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) was that some functionality is provided via [flinkey API](https://developers.flinkey.com/api/v3/getting-started/) only but there is no pre-built UI for that functionality anywhere. Therefore each customer of WITTE Digital needs to build their own UI that consumes these specific endpoints.

## Getting started

### Installation

```shell
npm install @planbgmbh/flinkey-web-components
```

### Usage example

```ts
Globals.customerId = 1;
Globals.apiKey = 'SomeApiKey';
Globals.token = 'ey123';
Globals.apiBaseUrl = 'https://api.flinkey.de/v3';
```

```html
<flinkey-keyfob-catalog></flinkey-keyfob-catalog>
```

## Contributing

Please read through our [contributing guidelines](./CONTRIBUTING.md).

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org/).
