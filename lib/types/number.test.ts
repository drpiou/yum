import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import include from '../rules/include';
import range from '../rules/range';
import catchError from '../utils/catchError';
import number, { isNumber } from './number';
import string from './string';

describe('number', () => {
  test('type', () => {
    const context = number();

    const _type = context.type;
    const _default = context.default;

    expect(_type).toBe('number');

    expectTypeOf(_default).toEqualTypeOf<number>();
  });

  test('_validateNumber', () => {
    const context = number();

    const [_, error] = catchError(() => context._validateNumber(context, 9));

    expect(error).toBe(undefined);
  });

  test('_validateNumber:string', () => {
    const context = number();

    const [_, error] = catchError(() => context._validateNumber(context, '9'));

    expect(error).toBe(undefined);
  });

  test('_validateNumber:object', () => {
    const context = number();

    const [_, error] = catchError(() => context._validateNumber(context, {}));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateNumber:cast', () => {
    const context = number({ cast: true });

    const [_, error] = catchError(() => context._validateNumber(context, {}));

    expect(error).toBe(undefined);
  });

  test('_validateNumber:cast:strict', () => {
    const context = number({ cast: true, strict: true });

    const [_, error] = catchError(() => context._validateNumber(context, {}));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateNumber:strict', () => {
    const context = number({ strict: true });

    const [_, error] = catchError(() => context._validateNumber(context, '9'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateNumber:validate:cast', () => {
    const context = number({ cast: false });

    const [_, error] = catchError(() => context._validateNumber(context, {}, { cast: true }));

    expect(error).toBe(undefined);
  });

  test('_validateNumber:validate:cast:strict', () => {
    const context = number({ cast: false, strict: false });

    const [_, error] = catchError(() => context._validateNumber(context, {}, { cast: true, strict: true }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateNumber:validate:strict', () => {
    const context = number({ strict: false });

    const [_, error] = catchError(() => context._validateNumber(context, '9', { strict: true }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateNumber:include', () => {
    const context = include([8, 9], number());

    const [_, error] = catchError(() => context._validateNumber(context, 9));

    expect(error).toBe(undefined);
  });

  test('_validateNumber:range', () => {
    const context = range([null, 2], number());

    const [_, error] = catchError(() => context._validateNumber(context, 1));

    expect(error).toBe(undefined);
  });

  test('_validateNumber:many', () => {
    const context = range([null, 2], include([8, 9], number()));

    const [_, error] = catchError(() => context._validateNumber(context, 3));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateNumber:many:first', () => {
    const context = range([null, 2], include([8, 9], number()));

    const [_, error] = catchError(() => context._validateNumber(context, 3, { first: true }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('isNumber:true', () => {
    const result = isNumber(number());

    expect(result).toBe(true);
  });

  test('isNumber:false', () => {
    const result = isNumber(string());

    expect(result).toBe(false);
  });
});
