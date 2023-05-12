import { describe, expect, test } from 'vitest';
import { yum } from './yum';

describe('yum', () => {
  test('string', () => {
    const context = yum
      .string()
      .label('String')
      .nullable(true)
      .transform((v) => String(v).toUpperCase());

    const [result] = context.validateSync('a');

    expect(result).toBe('A');
  });

  test('mixedOf:1', () => {
    const context = yum.mixedOf([yum.string(), yum.number()]).label('Object').nullable(true);

    const [result] = context.validateSync(3);

    expect(result).toBe(3);
  });

  test('mixedOf:2', () => {
    const context = yum.mixedOf([yum.string(), yum.boolean()]).label('Object').nullable(true);

    const [result] = context.validateSync(3);

    expect(result).toBe('3');
  });

  test('array:1', () => {
    const context = yum
      .array()
      .label('Object')
      .nullable(true)
      .of(yum.mixedOf([yum.string(), yum.number()]));

    const [result] = context.validateSync(['3', 3, '4', 4, '5', 5]);

    expect(result).toEqual(['3', 3, '4', 4, '5', 5]);
  });

  test('array:2', () => {
    const context = yum
      .array()
      .label('Object')
      .nullable(true)
      .of(yum.mixedOf([yum.string(), yum.boolean()]));

    const [result] = context.validateSync(['3', 3, '4', 4, '5', 5]);

    expect(result).toEqual(['3', '3', '4', '4', '5', '5']);
  });

  test('object', () => {
    const context = yum
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
        f: yum.mixedOf([yum.string(), yum.boolean()]),
        g: yum.array(),
        h: yum.array().of(
          yum.mixedOf([
            yum.string(),
            yum.boolean(),
            yum.object().shape({
              a: yum.mixedOf([yum.string(), yum.boolean()]),
            }),
          ]),
        ),
        i: yum.object(),
        j: yum.object().shape({
          a: yum.mixedOf([yum.string({ strict: true }), yum.boolean()]),
        }),
      });

    const [result] = context.validateSync({
      a: 'a',
      b: 3,
      c: true,
      d: new Date('2020-01-01'),
      e: 3,
      f: 3,
      g: [],
      h: [3, { a: 3 }],
      i: {},
      j: {
        a: '3',
      },
    });

    expect(result).toEqual({
      a: 'A',
      b: 3,
      c: true,
      d: new Date('2020-01-01'),
      e: 3,
      f: '3',
      g: [],
      h: ['3', { a: '3' }],
      i: {},
      j: {
        a: '3',
      },
    });
  });

  test('isMixed', () => {
    const result = yum.isMixed(yum.mixed());

    expect(result).toBe(true);
  });

  test('isString', () => {
    const result = yum.isString(yum.string());

    expect(result).toBe(true);
  });

  test('isNumber', () => {
    const result = yum.isNumber(yum.number());

    expect(result).toBe(true);
  });

  test('isBoolean', () => {
    const result = yum.isBoolean(yum.boolean());

    expect(result).toBe(true);
  });

  test('isDate', () => {
    const result = yum.isDate(yum.date());

    expect(result).toBe(true);
  });

  test('isArray', () => {
    const result = yum.isArray(yum.array());

    expect(result).toBe(true);
  });

  test('isObject', () => {
    const result = yum.isObject(yum.object());

    expect(result).toBe(true);
  });
});
