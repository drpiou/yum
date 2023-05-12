import { describe, expect, test } from 'vitest';
import YumError from '../error';
import number from '../types/number';
import object from '../types/object';
import string from '../types/string';
import catchError from '../utils/catchError';
import nullable from './nullable';
import required from './required';
import shape, { hasShape } from './shape';

describe('shape', () => {
  test('object:1', () => {
    const context = shape(
      {
        a: string({ strict: true }),
        b: number(),
        c: shape(
          {
            a: nullable(true, string()),
            b: required(true, number()),
          },
          object(),
        ),
      },
      object(),
    );

    const [_, error] = catchError(() => context._validateShape(context, { a: '', b: 9, c: { a: null, b: 9 } }));

    expect(error).toBe(undefined);
  });

  test('object:2', () => {
    const context = shape(
      {
        a: string({ strict: true }),
        b: number(),
        c: shape(
          {
            a: nullable(true, string()),
            b: required(true, number()),
          },
          object(),
        ),
      },
      object(),
    );

    const [_, error] = catchError(() => context._validateShape(context, { a: '', b: 9, c: { a: null, b: undefined } }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('object:3', () => {
    const context = shape(
      {
        a: string({ strict: true }),
        b: number(),
        c: shape(
          {
            a: nullable(true, string()),
            b: required(true, number()),
          },
          object(),
        ),
      },
      object(),
    );

    const [_, error] = catchError(() => context._validateShape(context, { a: 9, b: 9, c: { a: null, b: 9 } }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('hasShape:true', () => {
    const result = hasShape(shape({}, object()));

    expect(result).toBe(true);
  });

  test('hasShape:false', () => {
    const result = hasShape(string());

    expect(result).toBe(false);
  });
});
