import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import catchError from '../utils/catchError';
import date, { isDate, YumDateClass } from './date';
import string from './string';

describe('date', () => {
  test('class', () => {
    const context = new YumDateClass();

    const result = context.clone();

    expect(result.getSchema()).toEqual(context.getSchema());
  });

  // test('type', () => {
  //   const context = date();
  //
  //   const result = context.type;
  //
  //   expect(result).toBe('date');
  // });

  // test('default', () => {
  //   const context = date();
  //
  //   const result = context.default;
  //
  //   expectTypeOf(result).toEqualTypeOf<Date>();
  // });

  test('getSchema', () => {
    const context = date();

    const result = context.getSchema().default;

    expectTypeOf(result).toEqualTypeOf<Date>();
  });

  test('validate', () => {
    const context = date();

    const [_, error] = catchError(() => context.validate(new Date()));

    expect(error).toBe(undefined);
  });

  test('clone', () => {
    const context = date().nullable(true);

    const result = context.clone();

    context.nullable(false);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('label', () => {
    const context = date().label('Label');

    const result = context.getSchema().label;

    expect(result).toBe('Label');
  });

  test('custom', () => {
    const context = date().custom('password');

    const result = context.getSchema().custom;

    expect(result).toBe('password');
  });

  test('transform', () => {
    const context = date().transform((v) => new Date(v as never));

    const result = context.validate(3).getTime();

    expect(result).toBe(3);
  });

  test('merge', () => {
    const context = date().nullable(true);

    const result = date().merge(context);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('nullable', () => {
    const context = date().nullable(true);

    const [_, error] = context.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('required', () => {
    const context = date().required(true);

    const [_, error] = context.validateSync(undefined);

    expect(error).toBeInstanceOf(YumError);
  });

  test('include', () => {
    const context = date().include([new Date('2080-01-01'), new Date('2090-01-01')]);

    const [_, error] = context.validateSync(new Date('2090-01-01'));

    expect(error).toBe(undefined);
  });

  test('range', () => {
    const context = date().range([null, new Date('2020-01-01').getTime()]);

    const [_, error] = context.validateSync(new Date('2010-01-01'));

    expect(error).toBe(undefined);
  });

  test('isDate:true', () => {
    const result = isDate(date());

    expect(result).toBe(true);
  });

  test('isDate:false', () => {
    const result = isDate(string());

    expect(result).toBe(false);
  });
});
