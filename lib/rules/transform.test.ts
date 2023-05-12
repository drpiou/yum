import { describe, expect, test } from 'vitest';
import string from '../types/string';
import transform, { hasTransform } from './transform';

describe('transform', () => {
  test('type', () => {
    const result = transform((s) => String(s).toUpperCase(), string());

    const _transform = result.transform;

    expect(_transform('a')).toBe('A');
  });

  test('hasTransform:true', () => {
    const result = hasTransform(transform(() => '', string()));

    expect(result).toBe(true);
  });

  test('hasTransform:false', () => {
    const result = hasTransform(string());

    expect(result).toBe(false);
  });
});
