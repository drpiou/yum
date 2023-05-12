import { describe, expect, test } from 'vitest';
import YumError from '../error';
import array from '../types/array';
import date from '../types/date';
import string from '../types/string';
import catchError from '../utils/catchError';
import include, { hasInclude } from './include';
import nullable from './nullable';
import required from './required';

describe('include', () => {
  test('string:1', () => {
    const context = include(['a', 'b'], string());

    const [_, error] = catchError(() => context._validateInclude(context, 'a'));

    expect(error).toBe(undefined);
  });

  test('string:2', () => {
    const context = include(['a', 'b'], string());

    const [_, error] = catchError(() => context._validateInclude(context, 'c'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('message', () => {
    const context = include(['a', 'b'], string(), { message: '' });

    const [_, error] = catchError(() => context._validateInclude(context, 'c'));

    expect(error?.reasons[0]?.message).toBe('');
  });

  test('string:nullable:1', () => {
    const context = include(['a', 'b', null], nullable(true, string()));

    const [_, error] = catchError(() => context._validateInclude(context, null));

    expect(error).toBe(undefined);
  });

  test('string:nullable:2', () => {
    const context = include(['a', 'b', null], nullable(true, string()));

    const [_, error] = catchError(() => context._validateInclude(context, undefined));

    expect(error).toBeInstanceOf(YumError);
  });

  test('string:required:1', () => {
    const context = include(['a', 'b', undefined], required(false, string()));

    const [_, error] = catchError(() => context._validateInclude(context, null));

    expect(error).toBeInstanceOf(YumError);
  });

  test('string:required:2', () => {
    const context = include(['a', 'b', undefined], required(false, string()));

    const [_, error] = catchError(() => context._validateInclude(context, undefined));

    expect(error).toBe(undefined);
  });

  test('date:1', () => {
    const context = include([new Date('2000-01-01'), new Date('2010-01-01')], date());

    const [_, error] = catchError(() => context._validateInclude(context, new Date('2000-01-01')));

    expect(error).toBe(undefined);
  });

  test('date:2', () => {
    const context = include([new Date('2000-01-01'), new Date('2010-01-01')], date());

    const [_, error] = catchError(() => context._validateInclude(context, new Date('2020-01-01')));

    expect(error).toBeInstanceOf(YumError);
  });

  test('array:1', () => {
    const context = include([['a', 'b']], array());

    const [_, error] = catchError(() => context._validateInclude(context, ['a']));

    expect(error).toBe(undefined);
  });

  test('array:2', () => {
    const context = include([['a', 'b']], array());

    const [_, error] = catchError(() => context._validateInclude(context, ['a', 'b']));

    expect(error).toBe(undefined);
  });

  test('array:3', () => {
    const context = include([['a', 'b']], array());

    const [_, error] = catchError(() => context._validateInclude(context, ['c']));

    expect(error).toBeInstanceOf(YumError);
  });

  test('array:4', () => {
    const context = include([['a', 'b']], array());

    const [_, error] = catchError(() => context._validateInclude(context, ['a', 'c']));

    expect(error).toBeInstanceOf(YumError);
  });

  test('array:groups:1', () => {
    const context = include(
      [
        ['a', 'b'],
        ['x', 'y'],
      ],
      array(),
    );

    const [_, error] = catchError(() => context._validateInclude(context, ['a']));

    expect(error).toBe(undefined);
  });

  test('array:groups:2', () => {
    const context = include(
      [
        ['a', 'b'],
        ['x', 'y'],
      ],
      array(),
    );

    const [_, error] = catchError(() => context._validateInclude(context, ['x', 'y']));

    expect(error).toBe(undefined);
  });

  test('array:groups:3', () => {
    const context = include(
      [
        ['a', 'b'],
        ['x', 'y'],
      ],
      array(),
    );

    const [_, error] = catchError(() => context._validateInclude(context, ['a', 'x']));

    expect(error).toBeInstanceOf(YumError);
  });

  test('array:nullable:1', () => {
    const context = include([['a', 'b'], null], nullable(true, array()));

    const [_, error] = catchError(() => context._validateInclude(context, null));

    expect(error).toBe(undefined);
  });

  test('array:nullable:2', () => {
    const context = include([['a', 'b'], null], nullable(true, array()));

    const [_, error] = catchError(() => context._validateInclude(context, undefined));

    expect(error).toBeInstanceOf(YumError);
  });

  test('array:required:1', () => {
    const context = include([['a', 'b'], undefined], required(false, array()));

    const [_, error] = catchError(() => context._validateInclude(context, null));

    expect(error).toBeInstanceOf(YumError);
  });

  test('array:required:2', () => {
    const context = include([['a', 'b'], undefined], required(false, array()));

    const [_, error] = catchError(() => context._validateInclude(context, undefined));

    expect(error).toBe(undefined);
  });

  test('hasInclude:true', () => {
    const result = hasInclude(include([], string()));

    expect(result).toBe(true);
  });

  test('hasInclude:false', () => {
    const result = hasInclude(string());

    expect(result).toBe(false);
  });
});
