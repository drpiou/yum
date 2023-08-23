import { PlainObject } from '@drpiou/ts-utils';
import { describe, expect, test } from 'vitest';
import number from '../types/number';
import string from '../types/string';
import merge from './merge';
import nullable from './nullable';

describe('merge', () => {
  test('type', () => {
    const source = nullable(true, string());

    expect(source.nullable).toBe(true);
  });

  test('true', () => {
    const source = nullable(true, string());
    const result = merge(source, string());

    expect(result.nullable).toBe(true);
  });

  test('false', () => {
    const source = nullable(true, string());
    const result = merge(source as never, number());

    expect((result as PlainObject).nullable).toBe(undefined);
  });
});
