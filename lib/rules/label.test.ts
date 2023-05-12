import { describe, expect, test } from 'vitest';
import string from '../types/string';
import label, { hasLabel } from './label';

describe('label', () => {
  test('type', () => {
    const result = label('String', string());

    const _label = result.label;

    expect(_label).toBe('String');
  });

  test('hasLabel:true', () => {
    const result = hasLabel(label('', string()));

    expect(result).toBe(true);
  });

  test('hasLabel:false', () => {
    const result = hasLabel(string());

    expect(result).toBe(false);
  });
});
