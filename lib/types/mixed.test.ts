import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import or from '../rules/or';
import catchError from '../utils/catchError';
import mixed, { isMixed } from './mixed';
import string from './string';

describe('mixed', () => {
  test('type', () => {
    const context = mixed();

    const _type = context.type;
    const _default = context.default;

    expect(_type).toBe('mixed');

    expectTypeOf(_default).toEqualTypeOf<unknown>();
  });

  test('_validateMixed', () => {
    const context = mixed();

    const [_, error] = catchError(() => context._validateMixed(context, ''));

    expect(error).toBe(undefined);
  });

  test('_validateMixed:or', () => {
    const context = or([string()], mixed());

    const [_, error] = catchError(() => context._validateMixed(context, true));

    expect(error).toBeInstanceOf(YumError);
  });

  test('isMixed:true', () => {
    const result = isMixed(mixed());

    expect(result).toBe(true);
  });

  test('isMixed:false', () => {
    const result = isMixed(string());

    expect(result).toBe(false);
  });
});
