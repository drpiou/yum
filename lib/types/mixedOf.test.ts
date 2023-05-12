import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import catchError from '../utils/catchError';
import { isMixed } from './mixed';
import mixedOf from './mixedOf';
import string from './string';

describe('mixedOf', () => {
  test('type', () => {
    const context = mixedOf([string()]);

    const _type = context.type;
    const _default = context.default;

    expect(_type).toBe('mixed');

    expectTypeOf(_default).toEqualTypeOf<string>();
  });

  test('_validateMixed', () => {
    const context = mixedOf([string()]);

    const [_, error] = catchError(() => context._validateMixed(context, ''));

    expect(error).toBe(undefined);
  });

  test('_validateMixed:throw', () => {
    const context = mixedOf([string()]);

    const [_, error] = catchError(() => context._validateMixed(context, true));

    expect(error).toBeInstanceOf(YumError);
  });

  test('isMixed:true', () => {
    const result = isMixed(mixedOf([string()]));

    expect(result).toBe(true);
  });

  test('isMixed:false', () => {
    const result = isMixed(string());

    expect(result).toBe(false);
  });
});
