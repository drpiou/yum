import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import catchError from '../utils/catchError';
import number, { isNumber, YumNumberClass } from './number';
import string from './string';

describe('number', () => {
  test('class', () => {
    const context = new YumNumberClass();

    const result = context.clone();

    expect(result.getSchema()).toEqual(context.getSchema());
  });

  // test('type', () => {
  //   const context = number();
  //
  //   const result = context.type;
  //
  //   expect(result).toBe('number');
  // });

  // test('default', () => {
  //   const context = number();
  //
  //   const result = context.default;
  //
  //   expectTypeOf(result).toEqualTypeOf<number>();
  // });

  test('getSchema', () => {
    const context = number();

    const result = context.getSchema().default;

    expectTypeOf(result).toEqualTypeOf<number>();
  });

  test('validate', () => {
    const context = number();

    const [_, error] = catchError(() => context.validate(0));

    expect(error).toBe(undefined);
  });

  test('clone', () => {
    const context = number().nullable(true);

    const result = context.clone();

    context.nullable(false);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('label', () => {
    const context = number().label('Label');

    const result = context.getSchema().label;

    expect(result).toBe('Label');
  });

  test('custom', () => {
    const context = number().custom('password');

    const result = context.getSchema().custom;

    expect(result).toBe('password');
  });

  test('transform', () => {
    const context = number().transform((v) => Number(v));

    const result = context.validate('3');

    expect(result).toBe(3);
  });

  test('merge', () => {
    const context = number().nullable(true);

    const result = number().merge(context);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('nullable', () => {
    const context = number().nullable(true);

    const [_, error] = context.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('required', () => {
    const context = number().required(true);

    const [_, error] = context.validateSync(undefined);

    expect(error).toBeInstanceOf(YumError);
  });

  test('include', () => {
    const context = number().include([1, 2]);

    const [_, error] = context.validateSync(1);

    expect(error).toBe(undefined);
  });

  test('range', () => {
    const context = number().range([null, 2]);

    const [_, error] = context.validateSync(1);

    expect(error).toBe(undefined);
  });

  test('isNumber:true', () => {
    const result = isNumber(number());

    expect(result).toBe(true);
  });

  test('isNumber:false', () => {
    const result = isNumber(string());

    expect(result).toBe(false);
  });
});
