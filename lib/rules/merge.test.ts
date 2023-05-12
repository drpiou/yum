import { describe, expect, test } from 'vitest';
import string from '../types/string';
import merge from './merge';
import nullable from './nullable';

describe('merge', () => {
  test('type', () => {
    const source = nullable(true, string());

    expect(source.nullable).toBe(true);
  });

  test('type', () => {
    const source = nullable(true, string());
    const result = merge(source, string());

    expect(result.nullable).toBe(true);
  });
});
