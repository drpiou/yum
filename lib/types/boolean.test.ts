import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import catchError from '../utils/catchError';
import boolean, { isBoolean } from './boolean';
import string from './string';

describe('boolean', () => {
  test('type', () => {
    const context = boolean();

    const _type = context.type;
    const _default = context.default;

    expect(_type).toBe('boolean');

    expectTypeOf(_default).toEqualTypeOf<boolean>();
  });

  test('_validateBoolean', () => {
    const context = boolean();

    const [_, error] = catchError(() => context._validateBoolean(context, true));

    expect(error).toBe(undefined);
  });

  test('_validateBoolean:string', () => {
    const context = boolean();

    const [_, error] = catchError(() => context._validateBoolean(context, 'true'));

    expect(error).toBe(undefined);
  });

  test('_validateBoolean:object', () => {
    const context = boolean();

    const [_, error] = catchError(() => context._validateBoolean(context, {}));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateBoolean:cast', () => {
    const context = boolean({ cast: true });

    const [_, error] = catchError(() => context._validateBoolean(context, {}));

    expect(error).toBe(undefined);
  });

  test('_validateBoolean:cast:strict', () => {
    const context = boolean({ cast: true, strict: true });

    const [_, error] = catchError(() => context._validateBoolean(context, {}));

    expect(error).toBe(undefined);
  });

  test('_validateBoolean:strict', () => {
    const context = boolean({ strict: true });

    const [_, error] = catchError(() => context._validateBoolean(context, 'true'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateBoolean:validate:cast', () => {
    const context = boolean({ cast: false });

    const [_, error] = catchError(() => context._validateBoolean(context, {}, { cast: true }));

    expect(error).toBe(undefined);
  });

  test('_validateBoolean:validate:cast:strict', () => {
    const context = boolean({ cast: false, strict: false });

    const [_, error] = catchError(() => context._validateBoolean(context, {}, { cast: true, strict: true }));

    expect(error).toBe(undefined);
  });

  test('_validateBoolean:validate:strict', () => {
    const context = boolean({ strict: false });

    const [_, error] = catchError(() => context._validateBoolean(context, 'true', { strict: true }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('isBoolean:true', () => {
    const result = isBoolean(boolean());

    expect(result).toBe(true);
  });

  test('isBoolean:false', () => {
    const result = isBoolean(string());

    expect(result).toBe(false);
  });
});
