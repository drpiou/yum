import { describe, expect, test } from 'vitest';
import YumError from '../error';
import validate from '../rules/validate';
import string from '../types/string';
import catchError from './catchError';

describe('catchError', () => {
  test('default', () => {
    const context = string();

    const [result, error] = catchError(() => validate(context, ''));

    if (!error) {
      const _result = result;
    }

    expect(result).toBe('');
  });

  test('throw', () => {
    const context = string();

    const [_, error] = catchError(() => validate(context, true));

    expect(error).toBeInstanceOf(YumError);
  });

  test('error', () => {
    const result = (): void => {
      throw Error('__ERROR__');
    };

    expect(() => catchError(result)).toThrowError('__ERROR__');
  });
});
