import { describe, expect, test } from 'vitest';
import YumError from '../error';
import string from '../types/string';
import catchError from '../utils/catchError';
import regex, { hasRegex } from './regex';

describe('regex', () => {
  test('string:1', () => {
    const context = regex(/[a-z]/g, string());

    const [_, error] = catchError(() => context._validateRegex(context, 'a'));

    expect(error).toBe(undefined);
  });

  test('string:2', () => {
    const context = regex(/[a-z]/g, string());

    const [_, error] = catchError(() => context._validateRegex(context, '9'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('message', () => {
    const context = regex(/[a-z]/g, string(), { message: '' });

    const [_, error] = catchError(() => context._validateRegex(context, '9'));

    expect(error?.reasons[0]?.message).toBe('');
  });

  test('hasRegex:true', () => {
    const result = hasRegex(regex(/[a-z]/g, string()));

    expect(result).toBe(true);
  });

  test('hasRegex:false', () => {
    const result = hasRegex(string());

    expect(result).toBe(false);
  });
});
