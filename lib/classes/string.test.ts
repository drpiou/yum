import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import catchError from '../utils/catchError';
import number from './number';
import string, { isString, YumStringClass } from './string';

describe('string', () => {
  test('class', () => {
    const context = new YumStringClass();

    const result = context.clone();

    expect(result.getSchema()).toEqual(context.getSchema());
  });

  // test('type', () => {
  //   const context = string();
  //
  //   const result = context.type;
  //
  //   expect(result).toBe('string');
  // });

  // test('default', () => {
  //   const context = string();
  //
  //   const result = context.default;
  //
  //   expectTypeOf(result).toEqualTypeOf<string>();
  // });

  test('getSchema', () => {
    const context = string();

    const result = context.getSchema().default;

    expectTypeOf(result).toEqualTypeOf<string>();
  });

  test('validate', () => {
    const context = string();

    const [_, error] = catchError(() => context.validate(''));

    expect(error).toBe(undefined);
  });

  test('clone', () => {
    const context = string().nullable(true);

    const result = context.clone();

    context.nullable(false);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('label', () => {
    const context = string().label('Label');

    const result = context.getSchema().label;

    expect(result).toBe('Label');
  });

  test('custom', () => {
    const context = string().custom('password');

    const result = context.getSchema().custom;

    expect(result).toBe('password');
  });

  test('transform', () => {
    const context = string().transform((v) => String(v));

    const result = context.validate(3);

    expect(result).toBe('3');
  });

  test('merge', () => {
    const context = string().nullable(true);

    const result = string().merge(context);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('nullable', () => {
    const context = string().nullable(true);

    const [_, error] = context.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('required', () => {
    const context = string().required(true);

    const [_, error] = context.validateSync(undefined);

    expect(error).toBeInstanceOf(YumError);
  });

  test('format', () => {
    const context = string().format('date');

    const [_, error] = context.validateSync('2020-01-01');

    expect(error).toBe(undefined);
  });

  test('include', () => {
    const context = string().include(['a', 'b']);

    const [_, error] = context.validateSync('a');

    expect(error).toBe(undefined);
  });

  test('range', () => {
    const context = string().range([null, 2]);

    const [_, error] = context.validateSync('1');

    expect(error).toBe(undefined);
  });

  test('regex', () => {
    const context = string().regex(/[a-z]/g);

    const [_, error] = context.validateSync('a');

    expect(error).toBe(undefined);
  });

  test('isString:true', () => {
    const result = isString(string());

    expect(result).toBe(true);
  });

  test('isString:false', () => {
    const result = isString(number());

    expect(result).toBe(false);
  });
});
