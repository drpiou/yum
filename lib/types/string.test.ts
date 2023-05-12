import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import format from '../rules/format';
import include from '../rules/include';
import range from '../rules/range';
import regex from '../rules/regex';
import catchError from '../utils/catchError';
import number from './number';
import string, { isString } from './string';

describe('string', () => {
  test('type', () => {
    const context = string();

    const _type = context.type;
    const _default = context.default;

    expect(_type).toBe('string');

    expectTypeOf(_default).toEqualTypeOf<string>();
  });

  test('_validateString', () => {
    const context = string();

    const [_, error] = catchError(() => context._validateString(context, ''));

    expect(error).toBe(undefined);
  });

  test('_validateString:number', () => {
    const context = string();

    const [_, error] = catchError(() => context._validateString(context, 9));

    expect(error).toBe(undefined);
  });

  test('_validateString:object', () => {
    const context = string();

    const [_, error] = catchError(() => context._validateString(context, {}));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateString:cast', () => {
    const context = string({ cast: true });

    const [_, error] = catchError(() => context._validateString(context, {}));

    expect(error).toBe(undefined);
  });

  test('_validateString:cast:strict', () => {
    const context = string({ cast: true, strict: true });

    const [_, error] = catchError(() => context._validateString(context, {}));

    expect(error).toBe(undefined);
  });

  test('_validateString:strict', () => {
    const context = string({ strict: true });

    const [_, error] = catchError(() => context._validateString(context, 9));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateString:validate:cast', () => {
    const context = string({ cast: false });

    const [_, error] = catchError(() => context._validateString(context, {}, { cast: true }));

    expect(error).toBe(undefined);
  });

  test('_validateString:validate:cast:strict', () => {
    const context = string({ cast: false, strict: false });

    const [_, error] = catchError(() => context._validateString(context, {}, { cast: true, strict: true }));

    expect(error).toBe(undefined);
  });

  test('_validateString:validate:strict', () => {
    const context = string({ strict: false });

    const [_, error] = catchError(() => context._validateString(context, 9, { strict: true }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateString:format', () => {
    const context = format('date', string());

    const [_, error] = catchError(() => context._validateString(context, '2020-01-01'));

    expect(error).toBe(undefined);
  });

  test('_validateString:include', () => {
    const context = include(['a', 'b'], string());

    const [_, error] = catchError(() => context._validateString(context, 'a'));

    expect(error).toBe(undefined);
  });

  test('_validateString:range', () => {
    const context = range([null, 2], string());

    const [_, error] = catchError(() => context._validateString(context, '1'));

    expect(error).toBe(undefined);
  });

  test('_validateString:regex', () => {
    const context = regex(/[a-z]/g, string());

    const [_, error] = catchError(() => context._validateString(context, 'a'));

    expect(error).toBe(undefined);
  });

  test('_validateString:many', () => {
    const context = range([null, 2], regex(/[a-z]/g, string()));

    const [_, error] = catchError(() => context._validateString(context, '123'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateString:many:first', () => {
    const context = range([null, 2], regex(/[a-z]/g, string()));

    const [_, error] = catchError(() => context._validateString(context, '123', { first: true }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('isString:true', () => {
    const result = isString(string());

    expect(result).toBe(true);
  });

  test('isString:false', () => {
    const result = isString(number());

    expect(result).toBe(false);
  });
});
