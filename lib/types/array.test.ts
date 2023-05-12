import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import include from '../rules/include';
import nullable from '../rules/nullable';
import of from '../rules/of';
import range from '../rules/range';
import required from '../rules/required';
import catchError from '../utils/catchError';
import array, { isArray } from './array';
import mixedOf from './mixedOf';
import number from './number';
import string from './string';

describe('array', () => {
  test('type', () => {
    const context = array();

    const _type = context.type;
    const _default = context.default;

    expect(_type).toBe('array');

    expectTypeOf(_default).toEqualTypeOf<unknown[]>();
  });

  test('of:string', () => {
    const context = nullable(true, of(string(), required(false, array())));

    const _default = context.default;

    expectTypeOf(_default).toEqualTypeOf<string[] | null | undefined>();
  });

  test('of:mixedOf', () => {
    const context = of(mixedOf([string(), number()]), array());

    const _default = context.default;

    expectTypeOf(_default).toEqualTypeOf<(string | number)[]>();
  });

  test('_validateArray', () => {
    const context = array();

    const [_, error] = catchError(() => context._validateArray(context, [9]));

    expect(error).toBe(undefined);
  });

  test('_validateArray:of', () => {
    const context = of(string(), array());

    const [_, error] = catchError(() => context._validateArray(context, [true]));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateArray:object', () => {
    const context = array();

    const [_, error] = catchError(() => context._validateArray(context, {}));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateArray:cast', () => {
    const context = array({ cast: true });

    const [_, error] = catchError(() => context._validateArray(context, {}));

    expect(error).toBe(undefined);
  });

  test('_validateArray:validate:cast', () => {
    const context = array({ cast: true });

    const [_, error] = catchError(() => context._validateArray(context, {}, { cast: true }));

    expect(error).toBe(undefined);
  });

  test('_validateArray:include', () => {
    const context = include([[8, 9]], array());

    const [_, error] = catchError(() => context._validateArray(context, [9]));

    expect(error).toBe(undefined);
  });

  test('_validateArray:range', () => {
    const context = range([null, 2], array());

    const [_, error] = catchError(() => context._validateArray(context, [9]));

    expect(error).toBe(undefined);
  });

  test('_validateArray:many', () => {
    const context = range([[null, 2], [4]], include([[8, 9]], array()));

    const [_, error] = catchError(() => context._validateArray(context, [9, 9, 9]));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateArray:many:first', () => {
    const context = range([[null, 2], [4]], include([[8, 9]], array()));

    const [_, error] = catchError(() => context._validateArray(context, [9, 9, 9], { first: true }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('isArray:true', () => {
    const result = isArray(array());

    expect(result).toBe(true);
  });

  test('isArray:false', () => {
    const result = isArray(string());

    expect(result).toBe(false);
  });
});
