import { describe, expect, test } from 'vitest';
import string from '../types/string';
import custom, { hasCustom } from './custom';

describe('custom', () => {
  test('type', () => {
    const result = custom('password', string());

    const _custom = result.custom;

    expect(_custom).toBe('password');
  });

  test('hasCustom:true', () => {
    const result = hasCustom(custom('', string()));

    expect(result).toBe(true);
  });

  test('hasCustom:false', () => {
    const result = hasCustom(string());

    expect(result).toBe(false);
  });
});
