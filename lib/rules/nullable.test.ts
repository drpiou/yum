import { describe, expect, test } from 'vitest';
import YumError from '../error';
import string from '../types/string';
import catchError from '../utils/catchError';
import nullable, { hasNullable } from './nullable';

describe('nullable', () => {
  test('true', () => {
    const context = nullable(true, string());

    const [_, error] = catchError(() => context._validateNullable(context, null));

    expect(error).toBe(undefined);
  });

  test('false', () => {
    const context = nullable(false, string());

    const [_, error] = catchError(() => context._validateNullable(context, null));

    expect(error).toBeInstanceOf(YumError);
  });

  test('message', () => {
    const context = nullable(false, string(), { message: '' });

    const [_, error] = catchError(() => context._validateNullable(context, null));

    expect(error?.reasons[0]?.message).toBe('');
  });

  test('hasNullable:true', () => {
    const result = hasNullable(nullable(true, string()));

    expect(result).toBe(true);
  });

  test('hasNullable:false', () => {
    const result = hasNullable(string());

    expect(result).toBe(false);
  });
});
