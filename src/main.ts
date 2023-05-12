import { yum } from '../lib';

try {
  const string = yum
    .string()
    .label('String')
    .nullable(true)
    .transform((v) => String(v).toUpperCase());

  console.log('__DEV__', { string });

  const result = string.validate('a');

  console.log('__DEV__', { result });
} catch (error) {
  console.log('__DEV__', { error });
}

try {
  const mixedOf = yum.mixedOf([yum.string(), yum.number()]).label('Object').nullable(true);

  console.log('__DEV__', { mixedOf });

  const result = mixedOf.validate(3);

  console.log('__DEV__', { result });
} catch (error) {
  console.log('__DEV__', { error });
}

try {
  const mixedOf = yum.mixedOf([yum.string(), yum.boolean()]).label('Object').nullable(true);

  console.log('__DEV__', { mixedOf });

  const result = mixedOf.validate(3);

  console.log('__DEV__', { result });
} catch (error) {
  console.log('__DEV__', { error });
}

try {
  const array = yum
    .array()
    .label('Object')
    .nullable(true)
    .of(yum.mixedOf([yum.string(), yum.number()]));

  console.log('__DEV__', { array });

  const result = array.validate(['3', 3, '4', 4, '5', 5]);

  console.log('__DEV__', { result });
} catch (error) {
  console.log('__DEV__', { error });
}

try {
  const array = yum
    .array()
    .label('Object')
    .nullable(true)
    .of(yum.mixedOf([yum.string(), yum.boolean()]));

  console.log('__DEV__', { array });

  const result = array.validate(['3', 3, '4', 4, '5', 5]);

  console.log('__DEV__', { result });
} catch (error) {
  console.log('__DEV__', { error });
}

try {
  const object = yum
    .object()
    .label('Object')
    .nullable(true)
    .shape({
      a: yum
        .string()
        .required(true)
        .transform((v) => String(v).toUpperCase()),
      b: yum.number().label('Number'),
      c: yum.boolean(),
      d: yum.date(),
      e: yum.mixed(),
      f: yum.mixedOf([yum.string({ strict: true }), yum.boolean()]),
      g: yum.array(),
      h: yum.array().of(
        yum.mixedOf([
          yum.string({ strict: true }),
          yum.boolean(),
          yum.object().shape({
            a: yum.mixedOf([yum.string({ strict: true }), yum.boolean()]),
          }),
        ]),
      ),
      i: yum.object(),
      j: yum.object().shape({
        a: yum.mixedOf([yum.string({ strict: true }), yum.boolean()]),
      }),
    });

  console.log('__DEV__', { object });

  const result = object.validate({
    a: 'a',
    // b: 3,
    c: true,
    d: new Date(),
    e: 3,
    f: 3,
    g: [],
    h: [3, { a: 3 }],
    i: {},
    j: {
      a: 3,
    },
  });

  console.log('__DEV__', { result });
} catch (error) {
  console.log('__DEV__', { error });
}

export {};
