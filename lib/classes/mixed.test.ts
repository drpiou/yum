import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import catchError from '../utils/catchError';
import mixed, { isMixed, YumMixedClass } from './mixed';
import string from './string';

describe('mixed', () => {
  test('class', () => {
    const context = new YumMixedClass();

    const result = context.clone();

    expect(result.getSchema()).toEqual(context.getSchema());
  });

  test('of', () => {
    const context = YumMixedClass.of([string()]);

    const result = context.clone();

    expect(result.getSchema()).toEqual(context.getSchema());
  });

  // test('type', () => {
  //   const context = mixed();
  //
  //   const result = context.type;
  //
  //   expect(result).toBe('mixed');
  // });

  // test('default', () => {
  //   const context = mixed();
  //
  //   const result = context.default;
  //
  //   expectTypeOf(result).toEqualTypeOf<unknown>();
  // });

  test('getSchema', () => {
    const context = mixed();

    const result = context.getSchema().default;

    expectTypeOf(result).toEqualTypeOf<unknown>();
  });

  test('validate', () => {
    const context = mixed();

    const [_, error] = catchError(() => context.validate(''));

    expect(error).toBe(undefined);
  });

  test('clone', () => {
    const context = mixed().nullable(true);

    const result = context.clone();

    context.nullable(false);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('label', () => {
    const context = mixed().label('Label');

    const result = context.getSchema().label;

    expect(result).toBe('Label');
  });

  test('transform', () => {
    const context = mixed().transform((v) => String(v));

    const result = context.validate(3);

    expect(result).toBe('3');
  });

  test('merge', () => {
    const context = mixed().nullable(true);

    const result = mixed().merge(context);

    const [_, error] = result.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('nullable', () => {
    const context = mixed().nullable(true);

    const [_, error] = context.validateSync(null);

    expect(error).toBe(undefined);
  });

  test('required', () => {
    const context = mixed().required(true);

    const [_, error] = context.validateSync(undefined);

    expect(error).toBeInstanceOf(YumError);
  });

  test('isMixed:true', () => {
    const result = isMixed(mixed());

    expect(result).toBe(true);
  });

  test('isMixed:false', () => {
    const result = isMixed(string());

    expect(result).toBe(false);
  });
});
