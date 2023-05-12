# `@drpiou/yum`

![Licence](https://img.shields.io/github/license/drpiou/yum)
![Package.json version](https://img.shields.io/github/package-json/v/drpiou/yum)
![Stage](https://img.shields.io/badge/stage-experimental-important)

The `@drpiou/yum` package provides a validator module.

> - written in TypeScript.

<!--ts-->

- [Installation](#installation)
- [Example](#example)
  - [String](#string)
- [Documentation](#documentation)

<!--te-->

## Installation

```shell
yarn add @drpiou/yum
```

## Example

### `string`

```typescript
import { yum, yumUtils } from '@drpiou/yum';

const context = yum.string().nullable(true);

try {
  const result = context.validate('');
  // -> ''
} catch (error) {
  if (yumUtils.isError(error)) {
    // -> YumError
  }
}

// or

context.validateSync('');
// [0] -> ''
// [1] -> undefined

context.validateSync(true);
// [0] -> undefined
// [1] -> YumError
```

## Documentation

```typescript
```
