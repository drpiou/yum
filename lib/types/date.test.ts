import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import include from '../rules/include';
import range from '../rules/range';
import catchError from '../utils/catchError';
import date, { isDate } from './date';
import string from './string';

describe('date', () => {
  test('type', () => {
    const context = date();

    const _type = context.type;
    const _default = context.default;

    expect(_type).toBe('date');

    expectTypeOf(_default).toEqualTypeOf<Date>();
  });

  test('_validateDate', () => {
    const context = date();

    const [_, error] = catchError(() => context._validateDate(context, new Date('2090-01-01')));

    expect(error).toBe(undefined);
  });

  test('_validateDate:number', () => {
    const context = date();

    const [_, error] = catchError(() => context._validateDate(context, 9));

    expect(error).toBe(undefined);
  });

  test('_validateDate:object', () => {
    const context = date();

    const [_, error] = catchError(() => context._validateDate(context, {}));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateDate:cast', () => {
    const context = date({ cast: true });

    const [_, error] = catchError(() => context._validateDate(context, {}));

    expect(error).toBe(undefined);
  });

  test('_validateDate:cast:strict', () => {
    const context = date({ cast: true, strict: true });

    const [_, error] = catchError(() => context._validateDate(context, {}));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateDate:strict', () => {
    const context = date({ strict: true });

    const [_, error] = catchError(() => context._validateDate(context, new Date(NaN)));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateDate:validate:cast', () => {
    const context = date({ cast: false });

    const [_, error] = catchError(() => context._validateDate(context, {}, { cast: true }));

    expect(error).toBe(undefined);
  });

  test('_validateDate:validate:cast:strict', () => {
    const context = date({ cast: false, strict: false });

    const [_, error] = catchError(() => context._validateDate(context, {}, { cast: true, strict: true }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateDate:validate:strict', () => {
    const context = date({ strict: false });

    const [_, error] = catchError(() => context._validateDate(context, new Date(NaN), { strict: true }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateDate:include', () => {
    const context = include([new Date('2080-01-01'), new Date('2090-01-01')], date());

    const [_, error] = catchError(() => context._validateDate(context, new Date('2090-01-01')));

    expect(error).toBe(undefined);
  });

  test('_validateDate:range', () => {
    const context = range([null, new Date('2020-01-01').getTime()], date());

    const [_, error] = catchError(() => context._validateDate(context, new Date('2010-01-01')));

    expect(error).toBe(undefined);
  });

  test('_validateDate:many', () => {
    const context = range(
      [null, new Date('2020-01-01').getTime()],
      include([new Date('2080-01-01'), new Date('2090-01-01')], date()),
    );

    const [_, error] = catchError(() => context._validateDate(context, new Date('2030-01-01')));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateDate:many:first', () => {
    const context = range(
      [null, new Date('2020-01-01').getTime()],
      include([new Date('2080-01-01'), new Date('2090-01-01')], date()),
    );

    const [_, error] = catchError(() => context._validateDate(context, new Date('2030-01-01'), { first: true }));

    expect(error).toBeInstanceOf(YumError);
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
