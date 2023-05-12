import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import catchError from '../utils/catchError';
import { isMixed } from './mixed';
import mixedOf from './mixedOf';
import string from './string';

describe('mixedOf', () => {
  // test('type', () => {
  //   const context = mixedOf([string()]);
  //
  //   const result = context.type;
  //
  //   expect(result).toBe('mixed');
  // });

  // test('type', () => {
  //   const context = mixedOf([string()]);
  //
  //   const result = context.default;
  //
  //   expectTypeOf(result).toEqualTypeOf<string>();
  // });

  test('getSchema', () => {
    const context = mixedOf([string()]);

    const result = context.getSchema().default;

    expectTypeOf(result).toEqualTypeOf<string>();
  });

  test('validate:1', () => {
    const context = mixedOf([string()]);

    const [_, error] = catchError(() => context.validate(''));

    expect(error).toBe(undefined);
  });

  test('validate:2', () => {
    const context = mixedOf([string()]);

    const [_, error] = context.validateSync(true);

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
