import castArray from 'lodash/castArray';
import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import catchError from '../utils/catchError';
import array, { isArray, YumArrayClass } from './array';
import string from './string';

describe('array', () => {
  test('class', () => {
    const context = new YumArrayClass();

    const result = context.clone();

    expect(result.getSchema()).toEqual(context.getSchema());
  });

  // test('type', () => {
  //   const context = array();
  //
  //   const result = context.type;
  //
  //   expect(result).toBe('array');
  // });

  // test('default', () => {
  //   const context = array();
  //
  //   const result = context.default;
  //
  //   expectTypeOf(result).toEqualTypeOf<unknown[]>();
  // });

  test('getSchema', () => {
    const context = array();

    const result = context.getSchema().default;

    expectTypeOf(result).toEqualTypeOf<unknown[]>();
  });

  test('validate', () => {
    const context = array();

    const [_, error] = catchError(() => context.validate(['']));

    expect(error).toBe(undefined);
  });

  test('of', () => {
    const context = array().of(string());

    const [_, error] = context.validateSync([true]);

    expect(error).toBeInstanceOf(YumError);
  });

  test('clone', () => {
    const context = array().nullable(true);

    const result = context.clone();

    context.nullable(false);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('label', () => {
    const context = array().label('Label');

    const result = context.getSchema().label;

    expect(result).toBe('Label');
  });

  test('custom', () => {
    const context = array().custom('password');

    const result = context.getSchema().custom;

    expect(result).toBe('password');
  });

  test('transform', () => {
    const context = array().transform((v) => castArray(v));

    const result = context.validate('3');

    expect(result).toEqual(['3']);
  });

  test('merge', () => {
    const context = array().nullable(true);

    const result = array().merge(context);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('nullable', () => {
    const context = array().nullable(true);

    const [_, error] = context.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('required', () => {
    const context = array().required(true);

    const [_, error] = context.validateSync(undefined);

    expect(error).toBeInstanceOf(YumError);
  });

  test('include', () => {
    const context = array().include([[1, 2]]);

    const [_, error] = context.validateSync([1]);

    expect(error).toBe(undefined);
  });

  test('range', () => {
    const context = array().range([null, 2]);

    const [_, error] = context.validateSync([1]);

    expect(error).toBe(undefined);
  });

  test('isArray:true', () => {
    const result = isArray(array());

    expect(result).toBe(true);
  });

  test('isArray:false', () => {
    const result = isArray(string());

    expect(result).toBe(false);
  });
});
