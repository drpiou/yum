import { isPlainObject } from '@drpiou/ts-utils';
import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import catchError from '../utils/catchError';
import object, { isObject, YumObjectClass } from './object';
import string from './string';

describe('object', () => {
  test('class', () => {
    const context = new YumObjectClass();

    const result = context.clone();

    expect(result.getSchema()).toEqual(context.getSchema());
  });

  // test('type', () => {
  //   const context = object();
  //
  //   const result = context.type;
  //
  //   expect(result).toBe('object');
  // });

  // test('default', () => {
  //   const context = object();
  //
  //   const result = context.default;
  //
  //   expectTypeOf(result).toEqualTypeOf<Record<string, unknown>>();
  // });

  test('getSchema', () => {
    const context = object();

    const result = context.getSchema().default;

    expectTypeOf(result).toEqualTypeOf<Record<string, unknown>>();
  });

  test('validate', () => {
    const context = object();

    const [_, error] = catchError(() => context.validate({ a: '' }));

    expect(error).toBe(undefined);
  });

  test('shape', () => {
    const context = object().shape({ a: string() });

    const [_, error] = context.validateSync({ a: true });

    expect(error).toBeInstanceOf(YumError);
  });

  test('clone', () => {
    const context = object().nullable(true);

    const result = context.clone();

    context.nullable(false);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('label', () => {
    const context = object().label('Label');

    const result = context.getSchema().label;

    expect(result).toBe('Label');
  });

  test('transform', () => {
    const context = object().transform((v) => (isPlainObject(v) ? v : { _und: v }));

    const result = context.validate('3');

    expect(result).toEqual({ _und: '3' });
  });

  test('merge', () => {
    const context = object().nullable(true);

    const result = object().merge(context);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('nullable', () => {
    const context = object().nullable(true);

    const [_, error] = context.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('required', () => {
    const context = object().required(true);

    const [_, error] = context.validateSync(undefined);

    expect(error).toBeInstanceOf(YumError);
  });

  test('isObject:true', () => {
    const result = isObject(object());

    expect(result).toBe(true);
  });

  test('isObject:false', () => {
    const result = isObject(string());

    expect(result).toBe(false);
  });
});
