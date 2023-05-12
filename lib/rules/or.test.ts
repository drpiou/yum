import { describe, expect, test } from 'vitest';
import YumError from '../error';
import boolean from '../types/boolean';
import mixed from '../types/mixed';
import number from '../types/number';
import string from '../types/string';
import catchError from '../utils/catchError';
import or, { hasOr } from './or';

describe('or', () => {
  test('mixed:1', () => {
    const context = or([string(), number()], mixed());

    const [_, error] = catchError(() => context._validateOr(context, 'a'));

    expect(error).toBe(undefined);
  });

  test('mixed:2', () => {
    const context = or([string(), number()], mixed());

    const [_, error] = catchError(() => context._validateOr(context, 9));

    expect(error).toBe(undefined);
  });

  test('mixed:strict:1', () => {
    const context = or([string({ strict: true }), boolean()], mixed());

    const [_, error] = catchError(() => context._validateOr(context, 9));

    expect(error).toBeInstanceOf(YumError);
  });

  test('mixed:strict:2', () => {
    const context = or([string({ strict: true }), boolean()], mixed());

    const [_, error] = catchError(() => context._validateOr(context, {}));

    expect(error).toBeInstanceOf(YumError);
  });

  test('hasOr:true', () => {
    const result = hasOr(or([], mixed()));

    expect(result).toBe(true);
  });

  test('hasOr:false', () => {
    const result = hasOr(string());

    expect(result).toBe(false);
  });
});
