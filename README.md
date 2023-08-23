# `@drpiou/yum`

![Licence](https://img.shields.io/github/license/drpiou/yum)
![Package.json version](https://img.shields.io/github/package-json/v/drpiou/yum)
![Stage](https://img.shields.io/badge/stage-experimental-important)

The `@drpiou/yum` package provides a validator module written in TypeScript.

<!--ts-->

- [Installation](#installation)
- [Documentation](#documentation)
  - [Yum](#yum)
    - [Methods](#methods)
      - [label](#label)
      - [transform](#transform)
      - [merge](#merge)
      - [nullable](#nullable)
      - [required](#required)
      - [clone](#clone)
      - [validate](#validate)
      - [validateSync](#validateSync)
    - [Types](#types)
      - [mixed](#mixed)
      - [mixedOf](#mixedOf)
      - [string](#string)
        - [format](#format)
        - [include](#include)
        - [range](#range)
        - [regex](#regex)
      - [number](#string)
        - [include](#include)
        - [range](#range)
      - [boolean](#string)
      - [date](#string)
        - [include](#include)
        - [range](#range)
      - [array](#string)
        - [of](#of)
        - [include](#include)
        - [range](#range)
      - [object](#object)
        - [shape](#shape)
  - [Modules](#modules)
    - [Types](#types)
      - [mixed](#mixed)
      - [mixedOf](#mixedOf)
      - [string](#string)
      - [number](#string)
      - [boolean](#string)
      - [date](#string)
      - [array](#string)
      - [object](#object)
    - [Rules](#rules)
      - [clone](#clone)
      - [custom](#custom)
      - [format](#format)
      - [include](#include)
      - [label](#label)
      - [merge](#merge)
      - [nullable](#nullable)
      - [of](#of)
      - [or](#or)
      - [range](#range)
      - [regex](#regex)
      - [required](#required)
      - [shape](#shape)
      - [transform](#transform)
      - [validate](#validate)
      - [validateSync](#validateSync)

<!--te-->

## Installation

```shell
yarn add @drpiou/yum
```

## Documentation

### Yum

#### Methods

##### `label`

```typescript
import { yum } from '@drpiou/yum';

const context = yum.string().label('MyString');

const faulty = context.validateSync(true);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be of type string.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
```

##### `transform`

```typescript
import { yum } from '@drpiou/yum';

const context = yum.string().transform((s) => String(s).toUpperCase());

const result = context.validateSync('a');
// result[0] -> 'A'
// result[1] -> undefined
```

##### `merge`

```typescript
import { yum } from '@drpiou/yum';

const base = yum.string().nullable(true);
const context = yum.string().merge(base);

const result = context.validateSync(null);
// result[0] -> null
// result[1] -> undefined
```

##### `nullable`

```typescript
import { yum } from '@drpiou/yum';

const context = yum.string().label('MyString');

const result = context.nullable(true).validateSync(null);
// result[0] -> null
// result[1] -> undefined

const faulty = context.nullable(false).validateSync(null);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The field MyString cannot be null.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'nullable'
// faulty[1].reasons[0].condition -> false
```

##### `required`

```typescript
import { yum } from '@drpiou/yum';

const context = yum.string().label('MyString');

const result = context.required(false).validateSync(undefined);
// result[0] -> undefined
// result[1] -> undefined

const faulty = context.required(true).validateSync(undefined);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The field MyString cannot be null.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'nullable'
// faulty[1].reasons[0].condition -> false
```

##### `clone`

```typescript
import { yum } from '@drpiou/yum';

const base = yum.string().nullable(false);
const context = base.clone().nullable(true);

const result = context.validateSync(null);
// result[0] -> null
// result[1] -> undefined

const faulty = base.validateSync(null);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString canot be null.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'nullable'
// faulty[1].reasons[0].condition -> false
```

##### `validate`

```typescript
import { yum, yumUtils } from '@drpiou/yum';

const context = yum.string().label('MyString');

try {
  const result = context.validate('');
  // result -> ''
} catch (error) {
  // Here we check if error is a YumError because `try/catch` will catch any Error type.
  if (yumUtils.isError(error)) {
    // error -> YumError
    // error.reasons[0].message -> 'The field MyString is required.'
    // error.reasons[0].label -> 'MyString'
    // error.reasons[0].type -> 'string'
    // error.reasons[0].rule -> 'required'
    // error.reasons[0].condition -> true
  }
}
```

##### `validateSync`

```typescript
import { yum } from '@drpiou/yum';

const context = yum.string().label('MyString');

const result = context.validateSync('');
// result[0] -> ''
// result[1] -> undefined

const faulty = context.validateSync(null);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The field MyString is required.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'required'
// faulty[1].reasons[0].condition -> true
```

#### Types

#### `mixed`

The type `mixed` basically validates anything. For example, you can use it to validate `nullable` or `required` and to apply `transform` no matter the nature of the field.

```typescript
import { yum } from '@drpiou/yum';

const context = yum.mixed().label('MyMixed');

const result = context.nullable(true).validateSync(null);
// result[0] -> null
// result[1] -> undefined

const faulty = context.nullable(false).validateSync(null);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The mixed field MyMixed cannot be null.'
// faulty[1].reasons[0].label -> 'MyMixed'
// faulty[1].reasons[0].type -> 'mixed'
// faulty[1].reasons[0].rule -> 'nullable'
// faulty[1].reasons[0].condition -> false
```

#### `mixedOf`

The type `mixedOf` validates multiple types. For example, you can use it to validate a field to be whether a `string` or a `boolean`.

```typescript
import { yum } from '@drpiou/yum';

const context = yum.mixedOf([
  yum.string().label('MyString'),
  yum.date().label('MyDate'),
]);

const result = context.validateSync('a');
// result[0] -> 'a'
// result[1] -> undefined

const faulty = context.validateSync(true);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be of type string.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
// faulty[1].reasons[1].message -> 'The date field MyDate must be of type date.'
// faulty[1].reasons[1].label -> 'MyDate'
// faulty[1].reasons[1].type -> 'date'
// faulty[1].reasons[1].rule -> 'type'
```

#### `string`

```typescript
import { yum } from '@drpiou/yum';

const context = yum.string().label('MyString');

const result = context.validateSync('a');
// result[0] -> 'a'
// result[1] -> undefined

const faulty = context.validateSync(true);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be of type string.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
```

##### `format`

The `format` rule validates the string to be in a valid format.

```typescript
import { yum } from '@drpiou/yum';

const context = yum.string().label('MyString').format('email');

const result = context.validateSync('my@email.com');
// result[0] -> 'my@email.com'
// result[1] -> undefined

const faulty = context.validateSync(true);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be in the valid "email" format.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'format'
// faulty[1].reasons[0].condition -> 'email'
```

##### `include`

The `include` rule validates the string to be in a set of values.

```typescript
import { yum } from '@drpiou/yum';

const context = yum.string().include(['a', 'b']);

const result = context.validateSync('a');
// result[0] -> 'a'
// result[1] -> undefined

const faulty = context.validateSync('c');
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString ...'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'include'
// faulty[1].reasons[0].condition -> ['a', 'b']
```

##### `range`

The `range` rule validates the string **length** to be in range.

```typescript
import { yum } from '@drpiou/yum';

const context = yum.string().range([1, 3]);

const result = context.validateSync('a');
// result[0] -> 'a'
// result[1] -> undefined

const faulty = context.validateSync('abcd');
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be greater or equal than 1 or less or equal than 3.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'range'
// faulty[1].reasons[0].condition -> [1, 3]
```

##### `regex`

The `range` rule validates the string to match a given RegExp.

```typescript
import { yum } from '@drpiou/yum';

const context = yum.string().regex(/[a-z]/g);

const result = context.validateSync('a');
// result[0] -> 'a'
// result[1] -> undefined

const faulty = context.validateSync('A');
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be in the valid regex format.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'regex'
// faulty[1].reasons[0].condition -> /[a-z]/g
```

#### `number`

```typescript
import { yum } from '@drpiou/yum';

const context = yum.number().label('MyNumber');

const result = context.validateSync(1);
// result[0] -> 1
// result[1] -> undefined

const faulty = context.validateSync(true);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The number field MyNumber must be of type number.'
// faulty[1].reasons[0].label -> 'MyNumber'
// faulty[1].reasons[0].type -> 'number'
// faulty[1].reasons[0].rule -> 'type'
```

##### `include`

The `include` rule validates the number to be in a set of values.

```typescript
import { yum } from '@drpiou/yum';

const context = yum.number().label('MyNumber').include([1, 2]);

const result = context.validateSync(1);
// result[0] -> 1
// result[1] -> undefined

const faulty = context.validateSync(3);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The number field MyNumber ...'
// faulty[1].reasons[0].label -> 'MyNumber'
// faulty[1].reasons[0].type -> 'number'
// faulty[1].reasons[0].rule -> 'include'
// faulty[1].reasons[0].condition -> [1, 2]
```

##### `range`

The `range` rule validates the number to be in range.

```typescript
import { yum } from '@drpiou/yum';

const context = yum.number().label('MyNumber').range([1, 3]);

const result = context.validateSync(1);
// result[0] -> 1
// result[1] -> undefined

const faulty = context.validateSync(4);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The number field MyNumber must be greater or equal than 1 or less or equal than 3.'
// faulty[1].reasons[0].label -> 'MyNumber'
// faulty[1].reasons[0].type -> 'number'
// faulty[1].reasons[0].rule -> 'range'
// faulty[1].reasons[0].condition -> [1, 3]
```

#### `boolean`

```typescript
import { yum } from '@drpiou/yum';

const context = yum.boolean().label('MyBoolean');

const result = context.validateSync(true);
// result[0] -> true
// result[1] -> undefined

const faulty = context.validateSync('');
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The boolean field MyBoolean must be of type boolean.'
// faulty[1].reasons[0].label -> 'MyBoolean'
// faulty[1].reasons[0].type -> 'boolean'
// faulty[1].reasons[0].rule -> 'type'
```

#### `date`

```typescript
import { yum } from '@drpiou/yum';

const context = yum.date().label('MyDate');

const result = context.validateSync(new Date());
// result[0] -> Date
// result[1] -> undefined

const faulty = context.validateSync(true);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The date field MyDate must be of type date.'
// faulty[1].reasons[0].label -> 'MyDate'
// faulty[1].reasons[0].type -> 'date'
// faulty[1].reasons[0].rule -> 'type'
```

##### `include`

The `include` rule validates the date to be in a set of values.

```typescript
import { yum } from '@drpiou/yum';

const context = yum.date().label('MyDate').include([
  new Date('2023-01-01'),
  new Date('2023-01-02'),
]);

const result = context.validateSync(new Date('2023-01-01'));
// result[0] -> Date
// result[1] -> undefined

const faulty = context.validateSync(new Date('2023-01-03'));
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The date field MyDate ...'
// faulty[1].reasons[0].label -> 'MyDate'
// faulty[1].reasons[0].type -> 'date'
// faulty[1].reasons[0].rule -> 'include'
// faulty[1].reasons[0].condition -> [new Date('2023-01-01'), new Date('2023-01-02')]
```

##### `range`

The `range` rule validates the date to be in range.

*Note that we need to give the timestamp of the date in the condition parameter.*

```typescript
import { yum } from '@drpiou/yum';

const context = yum.date().label('MyDate').range([
  new Date('2023-01-01').getTime(),
  new Date('2023-01-03').getTime(),
]);

const result = context.validateSync(new Date('2023-01-01'));
// result[0] -> Date
// result[1] -> undefined

const faulty = context.validateSync(new Date('2023-01-04'));
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The date field MyDate must be greater or equal than 1 or less or equal than 3.'
// faulty[1].reasons[0].label -> 'MyDate'
// faulty[1].reasons[0].type -> 'date'
// faulty[1].reasons[0].rule -> 'range'
// faulty[1].reasons[0].condition -> [1672527600, 1672614000]
```

#### `array`

```typescript
import { yum } from '@drpiou/yum';

const context = yum.array().label('MyArray');

const result = context.validateSync(['a']);
// result[0] -> ['a']
// result[1] -> undefined

const faulty = context.validateSync(true);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The array field MyArray must be of type array.'
// faulty[1].reasons[0].label -> 'MyArray'
// faulty[1].reasons[0].type -> 'array'
// faulty[1].reasons[0].rule -> 'type'
```

##### `of`

The `of` rule validates the type of the array items.

```typescript
import { yum } from '@drpiou/yum';

const base = yum.string().label('MyString');
const context = yum.array().of(base);

const result = context.validateSync(['a']);
// result[0] -> ['a']
// result[1] -> undefined

const faulty = context.validateSync([true]);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be of type string.'
// faulty[1].reasons[0].path -> '0'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
```

##### `include`

The `include` rule validates the array items to be in a set of values.

Multiple arrays can be combined to validate one of the values group:
```typescript
yum.array().include([['a', 'b']]);
// -> must be a mixed of 'a' and 'b'

yum.array().include([['a', 'b'], ['x', 'y']]);
// -> must be a mixed of 'a' and 'b'
// or must be a mixed of 'x' and 'y'
```

Example:

```typescript
import { yum } from '@drpiou/yum';

const context = yum.array().label('MyArray').include([['a', 'b']]);

const result = context.validateSync(['a']);
// result[0] -> ['a']
// result[1] -> undefined

const faulty = context.validateSync(['c']);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The array field MyArray ...'
// faulty[1].reasons[0].path -> '0'
// faulty[1].reasons[0].label -> 'MyArray'
// faulty[1].reasons[0].type -> 'array'
// faulty[1].reasons[0].rule -> 'include'
// faulty[1].reasons[0].condition -> [['a', 'b']]
```

##### `range`

The `range` rule validates the array **length** to be in range.

```typescript
import { yum } from '@drpiou/yum';

const context = yum.array().label('MyArray').range([1, 3]);

const result = context.validateSync(['a']);
// result[0] -> ['a']
// result[1] -> undefined

const faulty = context.validateSync(['a', 'b', 'c', 'd']);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The array field MyArray must be greater or equal than 1 or less or equal than 3.'
// faulty[1].reasons[0].path -> '0'
// faulty[1].reasons[0].label -> 'MyArray'
// faulty[1].reasons[0].type -> 'array'
// faulty[1].reasons[0].rule -> 'range'
// faulty[1].reasons[0].condition -> [1, 3]
```

#### `object`

##### `shape`

The `shape` rule validates the type of the object attributes.

```typescript
import { yum } from '@drpiou/yum';

const context = yum.object().shape({ 
  a: yum.string().label('MyString'),
});

const result = context.validateSync({ a: 'a' });
// result[0] -> { a: 'a' }
// result[1] -> undefined

const faulty = context.validateSync({ a: true });
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be of type string.'
// faulty[1].reasons[0].path -> 'a'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
```

### Modules

The modules are the core components of Yum. In fact Yum objects (used as `yum.string(). ...`) are just a wrapper around these modules for chaining methods.

If Yum objects seems more convenient to use, the idea of exposing these modules is to extend Yum for a more advanced usage of this library.

*Because Yum is still very experimental, many breaking change can occur.*

#### Types

##### `mixed`

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, mixed, validateSync } = yumTypes;

const context = label('MyMixed', mixed());

const result = validateSync('a', context);
// result[0] -> 'a'
// result[1] -> undefined

const faulty = validateSync(true, context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The mixed field MyMixed must be of type mixed.'
// faulty[1].reasons[0].label -> 'MyMixed'
// faulty[1].reasons[0].type -> 'mixed'
// faulty[1].reasons[0].rule -> 'type'
```

##### `mixedOf`

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, mixedOf, validateSync } = yumTypes;

const context = label('MyMixed', mixedOf());

const result = validateSync('a', context);
// result[0] -> 'a'
// result[1] -> undefined

const faulty = validateSync(true, context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The mixed field MyMixed must be of type mixed.'
// faulty[1].reasons[0].label -> 'MyMixed'
// faulty[1].reasons[0].type -> 'mixed'
// faulty[1].reasons[0].rule -> 'type'
```

##### `string`

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, string, validateSync } = yumTypes;

const context = label('MyString', string());

const result = validateSync('a', context);
// result[0] -> 'a'
// result[1] -> undefined

const faulty = validateSync(true, context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be of type string.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
```

##### `number`

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, number, validateSync } = yumTypes;

const context = label('MyNumber', number());

const result = validateSync(1, context);
// result[0] -> 1
// result[1] -> undefined

const faulty = validateSync(true, context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The number field MyNumber must be of type number.'
// faulty[1].reasons[0].label -> 'MyNumber'
// faulty[1].reasons[0].type -> 'number'
// faulty[1].reasons[0].rule -> 'type'
```

##### `boolean`

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, boolean, validateSync } = yumTypes;

const context = label('MyBoolean', boolean());

const result = validateSync(true, context);
// result[0] -> true
// result[1] -> undefined

const faulty = validateSync('', context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The boolean field MyBoolean must be of type boolean.'
// faulty[1].reasons[0].label -> 'MyBoolean'
// faulty[1].reasons[0].type -> 'boolean'
// faulty[1].reasons[0].rule -> 'type'
```

##### `date`

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, date, validateSync } = yumTypes;

const context = label('MyDate', date());

const result = validateSync(new Date(), context);
// result[0] -> Date
// result[1] -> undefined

const faulty = validateSync(true, context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The date field MyDate must be of type date.'
// faulty[1].reasons[0].label -> 'MyDate'
// faulty[1].reasons[0].type -> 'date'
// faulty[1].reasons[0].rule -> 'type'
```

##### `array`

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, array, validateSync } = yumTypes;

const context = label('MyArray', array());

const result = validateSync(['a'], context);
// result[0] -> ['a']
// result[1] -> undefined

const faulty = validateSync(true, context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The array field MyArray must be of type array.'
// faulty[1].reasons[0].label -> 'MyArray'
// faulty[1].reasons[0].type -> 'array'
// faulty[1].reasons[0].rule -> 'type'
```

##### `object`

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, object, validateSync } = yumTypes;

const context = label('MyObject', object());

const result = validateSync({ a: 'a' }, context);
// result[0] -> { a: 'a' }
// result[1] -> undefined

const faulty = validateSync(true, context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The object field MyObject must be of type object.'
// faulty[1].reasons[0].label -> 'MyObject'
// faulty[1].reasons[0].type -> 'object'
// faulty[1].reasons[0].rule -> 'type'
```

#### Rules

##### `clone`

```typescript
import { yumTypes } from '@drpiou/yum';

const { clone, object, validateSync } = yumTypes;

const base = nullable(false, string());

const context = nullable(true, clone(base));

const result = validateSync(null, context);
// result[0] -> null
// result[1] -> undefined

const faulty = validateSync(null, base);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString canot be null.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'nullable'
// faulty[1].reasons[0].condition -> false
```

##### `custom`

```typescript
import { yumRules, yumTypes } from '@drpiou/yum';

const { custom, label, string, validateSync } = yumTypes;

const context = custom('password', label('MyString', string()));

if (yumRules.hasCustom(context)) {
  if (context.custom === 'password') {
    //
  }
}
```

##### `format`

Valid formats are:
```typescript
'date' | 'email' | 'ipv4' | 'ipv6' | 'phone' | 'url' | 'uuid'
```

The `url` condition has the following options:

```typescript
yum.string().format('url', options as { 
  protocol?: string | string[];
});
```

The `uuid` condition has the following options:

```typescript
yum.string().format('uuid', options as { 
  version?: '1' | '2' | '3' | '4' | '5' | 'all';
});
```

Examples:

```typescript
import { yumTypes } from '@drpiou/yum';

const { format, label, string, validateSync } = yumTypes;

const context = format('email', label('MyString', string()));

const result = validateSync('my@email.com', context);
// result[0] -> 'my@email.com'
// result[1] -> undefined

const faulty = validateSync(true, context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be in the valid "email" format.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
```

##### `include`

```typescript
import { yumTypes } from '@drpiou/yum';

const { include, label, string, validateSync } = yumTypes;

const context = include(['a', 'b'], label('MyString', string()));

const result = validateSync('a', context);
// result[0] -> 'a'
// result[1] -> undefined

const faulty = validateSync('c', context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString ...'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
```

##### `label`

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, string, validateSync } = yumTypes;

const context = label('MyString', string());

const faulty = validateSync(true, context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be of type string.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
```

##### `merge`

```typescript
import { yumTypes } from '@drpiou/yum';

const { merge, nullable, string, validateSync } = yumTypes;

const base = nullable(true, string());
const context = merge(base, string());

const result = validateSync(null, context);
// result[0] -> null
// result[1] -> undefined
```

##### `nullable`

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, nullable, string, validateSync } = yumTypes;

const context = label('MyString', string());

const result = validateSync(null, nullable(true, context));
// result[0] -> null
// result[1] -> undefined

const faulty = validateSync(null, nullable(false, context));
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be of type string.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
```

##### `of`

```typescript
import { yumTypes } from '@drpiou/yum';

const { array, label, of, string, validateSync } = yumTypes;

const context = of(label('MyString', string()), array());

const result = validateSync(['a'], context);
// result[0] -> ['a']
// result[1] -> undefined

const faulty = validateSync([true], context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].path -> '0'
// faulty[1].reasons[0].message -> 'The string field MyString must be of type string.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
```

##### `or`

```typescript
import { yumTypes } from '@drpiou/yum';

const { date, label, mixed, or, string, validateSync } = yumTypes;

const context = or([label('MyString', string()), label('MyDate', date())], mixed());

const result = validateSync('a', context);
// result[0] -> 'a'
// result[1] -> undefined

const faulty = validateSync(true, context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be of type string.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
// faulty[1].reasons[1].message -> 'The date field MyDate must be of type date.'
// faulty[1].reasons[1].label -> 'MyDate'
// faulty[1].reasons[1].type -> 'date'
// faulty[1].reasons[1].rule -> 'type'
```

##### `range`

If `min` is `null`, then it checks only the maximum.
```typescript
range([null, 3], context);
// -> less than 3 or equal
```

If `max` is `undefined`, then it checks only the minimum.
```typescript
range([3], context);
// -> more than 3 or equal
```

If both `min` and `max` are given, it checks a range between `min` and `max`.
```typescript
range([1, 3], context);
// -> more than 1 or equal and less than 3 or equal
```

If the condition is an array of conditions, then it checks multiple possible ranges.
```typescript
range([[1, 3], [5, 8]], context);
// -> more than 1 or equal and less than 3 or equal
// or more than 5 or equal and less than 8 or equal

range([[null, 3], [5]], context);
// -> less than 3 or equal; or more than 5 or equal
```

Examples:

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, range, string, validateSync } = yumTypes;

const context = range([1, 3], label('MyString', string()));

const result = validateSync('a', context);
// result[0] -> 'a'
// result[1] -> undefined

const faulty = validateSync('abcd', context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be of type string.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
```

##### `regex`

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, regex, string, validateSync } = yumTypes;

const context = regex(/[a-z]/g, label('MyString', string()));

const result = validateSync('a', context);
// result[0] -> 'a'
// result[1] -> undefined

const faulty = validateSync('A', context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be of type string.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
```

##### `required`

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, required, string, validateSync } = yumTypes;

const context = label('MyString', string());

const result = validateSync(undefined, required(false, context));
// result[0] -> undefined
// result[1] -> undefined

const faulty = validateSync(undefined, required(true, context));
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The string field MyString must be of type string.'
// faulty[1].reasons[0].label -> 'MyString'
// faulty[1].reasons[0].type -> 'string'
// faulty[1].reasons[0].rule -> 'type'
```

##### `shape`

```typescript
import { yumTypes } from '@drpiou/yum';

const { label, object, shape, validateSync } = yumTypes;

const context = shape({ a: 'a' }, label('MyObject', object()));

const result = validateSync('a', context);
// result[0] -> 'a'
// result[1] -> undefined

const faulty = validateSync(true, context);
// faulty[0] -> undefined
// faulty[1] -> YumError
// faulty[1].reasons[0].message -> 'The object field MyObject must be of type object.'
// faulty[1].reasons[0].label -> 'MyObject'
// faulty[1].reasons[0].type -> 'object'
// faulty[1].reasons[0].rule -> 'type'
```

##### `transform`

```typescript
import { yumTypes } from '@drpiou/yum';

const { transform, string, validateSync } = yumTypes;

const context = transform((s) => String(s).toUpperCase(), string());

const result = validateSync('a', context);
// result[0] -> 'A'
// result[1] -> undefined
```

##### `validate`

```typescript
import { yumTypes, yumUtils } from '@drpiou/yum';

const { label, string, validate } = yumTypes;

const context = label('MyString', string());

try {
  const result = validate('', context);
  // result -> ''
} catch (error) {
  // Here we check if error is a YumError because `try/catch` will catch any Error type.
  if (yumUtils.isError(error)) {
    // error -> YumError
    // error.reasons[0].message -> 'The field MyString is required.'
    // error.reasons[0].label -> 'MyString'
    // error.reasons[0].type -> 'string'
    // error.reasons[0].rule -> 'required'
    // error.reasons[0].condition -> true
  }
}
```

##### `validateSync`

The `validateSync` method will return an array.

```typescript
import { yumTypes } from '@drpiou/yum';

const { string, validateSync } = yumTypes;

const context = string();

const result = validateSync('', context);

const value = result[0];
// -> `value` is the parsed value if the validation was successful
// or `undefined` if an error occurs

const error = result[1];
// -> `error` is `undefined` if the validation was successful
// or `YumError` if an error occurs
```

To type-check `result` in TypeScript, you need to test `error` first.

```typescript
import { yumTypes } from '@drpiou/yum';

const { string, validateSync } = yumTypes;

const context = string();

const [result, error] = validateSync('', context);

// Here `result` is: string | undefined
// Here `error` is: undefined | YumError

if (error) {
  // Here `error` is: YumError
} else {
  // Here `result` is: 'string'
}
```
