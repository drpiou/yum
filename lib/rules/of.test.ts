import { describe, expect, test } from 'vitest';
import YumError from '../error';
import array from '../types/array';
import boolean from '../types/boolean';
import mixedOf from '../types/mixedOf';
import number from '../types/number';
import string from '../types/string';
import catchError from '../utils/catchError';
import of, { hasOf } from './of';

describe('of', () => {
  test('string:1', () => {
    const context = of(string(), array());

    const [_, error] = catchError(() => context._validateOf(context, ['a']));

    expect(error).toBe(undefined);
  });

  test('string:2', () => {
    const context = of(string(), array());

    const [_, error] = catchError(() => context._validateOf(context, [9]));

    expect(error).toBe(undefined);
  });

  test('string:strict:1', () => {
    const context = of(string({ strict: true }), array());

    const [_, error] = catchError(() => context._validateOf(context, [9]));

    expect(error).toBeInstanceOf(YumError);
  });

  test('string:strict:2', () => {
    const context = of(string({ strict: true }), array());

    const [_, error] = catchError(() => context._validateOf(context, [true]));

    expect(error).toBeInstanceOf(YumError);
  });

  test('mixedOf:1', () => {
    const context = of(mixedOf([string(), number()]), array());

    const [_, error] = catchError(() => context._validateOf(context, ['a']));

    expect(error).toBe(undefined);
  });

  test('mixedOf:2', () => {
    const context = of(mixedOf([string(), number()]), array());

    const [_, error] = catchError(() => context._validateOf(context, [9]));

    expect(error).toBe(undefined);
  });

  test('mixedOf:strict:1', () => {
    const context = of(mixedOf([string({ strict: true }), boolean()]), array());

    const [_, error] = catchError(() => context._validateOf(context, [9]));

    expect(error).toBeInstanceOf(YumError);
  });

  test('mixedOf:strict:2', () => {
    const context = of(mixedOf([string({ strict: true }), boolean()]), array());

    const [_, error] = catchError(() => context._validateOf(context, [{}]));

    expect(error).toBeInstanceOf(YumError);
  });

  test('path', () => {
    const context = of(mixedOf([string({ strict: true }), boolean()]), array());

    const [_, error] = catchError(() => context._validateOf(context, [{}], { path: '__' }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('hasOf:true', () => {
    const result = hasOf(of(mixedOf([]), array()));

    expect(result).toBe(true);
  });

  test('hasOf:false', () => {
    const result = hasOf(string());

    expect(result).toBe(false);
  });
});
