import { describe, expect, test } from 'vitest';
import YumError from '../error';
import string from '../types/string';
import catchError from '../utils/catchError';
import required, { hasRequired } from './required';

describe('required', () => {
  test('true', () => {
    const context = required(false, string());

    const [_, error] = catchError(() => context._validateRequired(context, undefined));

    expect(error).toBe(undefined);
  });

  test('false', () => {
    const context = required(true, string());

    const [_, error] = catchError(() => context._validateRequired(context, undefined));

    expect(error).toBeInstanceOf(YumError);
  });

  test('message', () => {
    const context = required(true, string(), { message: '' });

    const [_, error] = catchError(() => context._validateRequired(context, undefined));

    expect(error?.reasons[0]?.message).toBe('');
  });

  test('hasRequired:true', () => {
    const result = hasRequired(required(true, string()));

    expect(result).toBe(true);
  });

  test('hasRequired:false', () => {
    const result = hasRequired(string());

    expect(result).toBe(false);
  });
});
