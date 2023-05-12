import { describe, expect, test } from 'vitest';
import YumError from '../error';
import string from '../types/string';
import catchError from '../utils/catchError';
import range, { hasRange } from './range';

describe('range', () => {
  test('any:1', () => {
    const context = range([null], string());

    const [_, error] = catchError(() => context._validateRange(context, -1));

    expect(error).toBe(undefined);
  });

  test('any:2', () => {
    const context = range([null], string());

    const [_, error] = catchError(() => context._validateRange(context, 0));

    expect(error).toBe(undefined);
  });

  test('any:3', () => {
    const context = range([null], string());

    const [_, error] = catchError(() => context._validateRange(context, 1));

    expect(error).toBe(undefined);
  });

  test('positive:1', () => {
    const context = range([0], string());

    const [_, error] = catchError(() => context._validateRange(context, -1));

    expect(error).toBeInstanceOf(YumError);
  });

  test('positive:2', () => {
    const context = range([0], string());

    const [_, error] = catchError(() => context._validateRange(context, 0));

    expect(error).toBe(undefined);
  });

  test('positive:3', () => {
    const context = range([0], string());

    const [_, error] = catchError(() => context._validateRange(context, 1));

    expect(error).toBe(undefined);
  });

  test('negative:1', () => {
    const context = range([null, 0], string());

    const [_, error] = catchError(() => context._validateRange(context, -1));

    expect(error).toBe(undefined);
  });

  test('negative:2', () => {
    const context = range([null, 0], string());

    const [_, error] = catchError(() => context._validateRange(context, 0));

    expect(error).toBe(undefined);
  });

  test('negative:3', () => {
    const context = range([null, 0], string());

    const [_, error] = catchError(() => context._validateRange(context, 1));

    expect(error).toBeInstanceOf(YumError);
  });

  test('message', () => {
    const context = range([0], string(), { message: '' });

    const [_, error] = catchError(() => context._validateRange(context, -1));

    expect(error?.reasons[0]?.message).toBe('');
  });

  test('ranges:1', () => {
    const context = range([[null, 2], [4, 6], [8]], string());

    const [_, error] = catchError(() => context._validateRange(context, 1));

    expect(error).toBe(undefined);
  });

  test('ranges:2', () => {
    const context = range([[null, 2], [4, 6], [8]], string());

    const [_, error] = catchError(() => context._validateRange(context, 3));

    expect(error).toBeInstanceOf(YumError);
  });

  test('ranges:3', () => {
    const context = range([[null, 2], [4, 6], [8]], string());

    const [_, error] = catchError(() => context._validateRange(context, 4));

    expect(error).toBe(undefined);
  });

  test('ranges:4', () => {
    const context = range([[null, 2], [4, 6], [8]], string());

    const [_, error] = catchError(() => context._validateRange(context, 7));

    expect(error).toBeInstanceOf(YumError);
  });

  test('ranges:5', () => {
    const context = range([[null, 2], [4, 6], [8]], string());

    const [_, error] = catchError(() => context._validateRange(context, 9));

    expect(error).toBe(undefined);
  });

  test('hasRange:true', () => {
    const result = hasRange(range([], string()));

    expect(result).toBe(true);
  });

  test('hasRange:false', () => {
    const result = hasRange(string());

    expect(result).toBe(false);
  });
});
