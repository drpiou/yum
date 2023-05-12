import { is } from '@drpiou/ts-utils';
import { describe, expect, test } from 'vitest';
import array from '../types/array';
import boolean from '../types/boolean';
import date from '../types/date';
import mixed from '../types/mixed';
import mixedOf from '../types/mixedOf';
import number from '../types/number';
import object from '../types/object';
import string from '../types/string';
import catchError from '../utils/catchError';
import nullable from './nullable';
import required from './required';
import transform from './transform';
import validate from './validate';

describe('validate', () => {
  test('mixed', () => {
    const context = mixed();

    const [result] = catchError(() => validate(context, ''));

    expect(result).toBe('');
  });

  test('string', () => {
    const context = string();

    const [result] = catchError(() => validate(context, ''));

    expect(result).toBe('');
  });

  test('number', () => {
    const context = number();

    const [result] = catchError(() => validate(context, 0));

    expect(result).toBe(0);
  });

  test('boolean', () => {
    const context = boolean();

    const [result] = catchError(() => validate(context, true));

    expect(result).toBe(true);
  });

  test('date', () => {
    const context = date();

    const [result] = catchError(() => validate(context, new Date('2020-01-01')));

    expect(result).toEqual(new Date('2020-01-01'));
  });

  test('array', () => {
    const context = array();

    const [result] = catchError(() => validate(context, []));

    expect(result).toEqual([]);
  });

  test('object', () => {
    const context = object();

    const [result] = catchError(() => validate(context, {}));

    expect(result).toEqual({});
  });

  test('nullable', () => {
    const context = nullable(true, string());

    const [result] = catchError(() => validate(context, null));

    expect(result).toBe(null);
  });

  test('required', () => {
    const context = required(false, string());

    const [result] = catchError(() => validate(context, undefined));

    expect(result).toBe(undefined);
  });

  test('transform', () => {
    const context = transform(() => '_', string());

    const [result] = catchError(() => validate(context, ''));

    expect(result).toBe('_');
  });

  test('cast', () => {
    const context = string();

    const [result] = catchError(() => validate(context, undefined, { cast: true }));

    expect(result).toBe('');
  });

  test('cast:required:false', () => {
    const context = required(false, string());

    const [result] = catchError(() => validate(context, undefined, { cast: true }));

    expect(result).toBe(undefined);
  });

  test('cast:required:true', () => {
    const context = required(true, string());

    const [result] = catchError(() => validate(context, undefined, { cast: true }));

    expect(result).toBe('');
  });

  test('cast:required:true:mixedOf', () => {
    const context = required(true, mixedOf([string()]));

    const [result] = catchError(() => validate(context, undefined, { cast: true }));

    expect(result).toBe('');
  });

  test('cast:nullable:required', () => {
    const context = nullable(true, required(true, string()));

    const [result] = catchError(() => validate(context, undefined, { cast: true }));

    expect(result).toBe(null);
  });

  test('cast:strict:required:false', () => {
    const context = required(false, date());

    const [result] = catchError(() => validate(context, NaN, { cast: true, strict: true }));

    expect(result).toBe(undefined);
  });

  test('cast:strict:required:true', () => {
    const context = required(true, date());

    const [result] = catchError(() => validate(context, undefined, { cast: true, strict: true }));

    expect(is.date(result)).toBe(true);
  });
});
