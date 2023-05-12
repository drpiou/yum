import { describe, expect, test } from 'vitest';
import string from '../types/string';
import clone from './clone';
import nullable from './nullable';

describe('clone', () => {
  test('source', () => {
    const source = nullable(true, string());

    expect(source.nullable).toBe(true);
  });

  test('result', () => {
    const source = nullable(true, string());
    const result = nullable(false, clone(source));

    expect(result.nullable).toBe(false);
  });
});
