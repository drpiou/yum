import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import catchError from '../utils/catchError';
import boolean, { isBoolean, YumBooleanClass } from './boolean';
import string from './string';

describe('boolean', () => {
  test('class', () => {
    const context = new YumBooleanClass();

    const result = context.clone();

    expect(result.getSchema()).toEqual(context.getSchema());
  });

  // test('type', () => {
  //   const context = boolean();
  //
  //   const result = context.type;
  //
  //   expect(result).toBe('boolean');
  // });
  //
  // test('default', () => {
  //   const context = boolean();
  //
  //   const result = context.default;
  //
  //   expectTypeOf(result).toEqualTypeOf<boolean>();
  // });

  test('getSchema', () => {
    const context = boolean();

    const result = context.getSchema().default;

    expectTypeOf(result).toEqualTypeOf<boolean>();
  });

  test('validate', () => {
    const context = boolean();

    const [_, error] = catchError(() => context.validate(true));

    expect(error).toBe(undefined);
  });

  test('clone', () => {
    const context = boolean().nullable(true);

    const result = context.clone();

    context.nullable(false);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('label', () => {
    const context = boolean().label('Label');

    const result = context.getSchema().label;

    expect(result).toBe('Label');
  });

  test('transform', () => {
    const context = boolean().transform((v) => Boolean(v));

    const result = context.validate('3');

    expect(result).toBe(true);
  });

  test('merge', () => {
    const context = boolean().nullable(true);

    const result = boolean().merge(context);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('nullable', () => {
    const context = boolean().nullable(true);

    const [_, error] = context.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('required', () => {
    const context = boolean().required(true);

    const [_, error] = context.validateSync(undefined);

    expect(error).toBeInstanceOf(YumError);
  });

  test('isBoolean:true', () => {
    const result = isBoolean(boolean());

    expect(result).toBe(true);
  });

  test('isBoolean:false', () => {
    const result = isBoolean(string());

    expect(result).toBe(false);
  });
});
