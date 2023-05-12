import { describe, expect, expectTypeOf, test } from 'vitest';
import YumError from '../error';
import nullable from '../rules/nullable';
import shape from '../rules/shape';
import catchError from '../utils/catchError';
import number from './number';
import object, { isObject } from './object';
import string from './string';

describe('object', () => {
  test('type', () => {
    const context = object();

    const _type = context.type;
    const _default = context.default;

    expect(_type).toBe('object');

    expectTypeOf(_default).toEqualTypeOf<Record<string, unknown>>();
  });

  test('shape', () => {
    const context = shape(
      {
        a: string(),
        b: number(),
        c: shape({ a: nullable(true, string()), b: number() }, object()),
      },
      object(),
    );

    const _default = context.shape.a.default;

    expectTypeOf(_default).toEqualTypeOf<string>();
  });

  test('_validateObject', () => {
    const context = object();

    const [_, error] = catchError(() => context._validateObject(context, { a: 3 }));

    expect(error).toBe(undefined);
  });

  test('_validateObject:number', () => {
    const context = object();

    const [_, error] = catchError(() => context._validateObject(context, 3));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateObject:shape:true', () => {
    const context = shape(
      {
        a: string(),
        b: number(),
        c: shape({ a: nullable(true, string()), b: number() }, object()),
      },
      object(),
    );

    const [_, error] = catchError(() => context._validateObject(context, { a: '', b: 0, c: { a: null, b: 0 } }));

    expect(error).toBe(undefined);
  });

  test('_validateObject:shape:false:a', () => {
    const context = shape(
      {
        a: string(),
        b: number(),
        c: shape({ a: nullable(true, string()), b: number() }, object()),
      },
      object(),
    );

    const [_, error] = catchError(() => context._validateObject(context, { a: null, b: 0, c: { a: null, b: 0 } }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateObject:shape:false:b', () => {
    const context = shape(
      {
        a: string(),
        b: number(),
        c: shape({ a: nullable(true, string()), b: number() }, object()),
      },
      object(),
    );

    const [_, error] = catchError(() => context._validateObject(context, { a: '', b: null, c: { a: null, b: 0 } }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateObject:shape:false:c.a', () => {
    const context = shape(
      {
        a: string(),
        b: number(),
        c: shape({ a: nullable(true, string()), b: number() }, object()),
      },
      object(),
    );

    const [_, error] = catchError(() => context._validateObject(context, { a: '', b: 0, c: { a: undefined, b: 0 } }));

    expect(error).toBeInstanceOf(YumError);
  });

  test('_validateObject:shape:false:c.b', () => {
    const context = shape(
      {
        a: string(),
        b: number(),
        c: shape({ a: nullable(true, string()), b: number() }, object()),
      },
      object(),
    );

    const [_, error] = catchError(() => context._validateObject(context, { a: '', b: 0, c: { a: null, b: null } }));

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
