import { describe, expect, test } from 'vitest';
import YumError from '../error';
import string from '../types/string';
import validateSync from './validateSync';

describe('validateSync', () => {
  test('default', () => {
    const context = string();

    const [result] = validateSync(context, '');

    expect(result).toBe('');
  });

  test('throw', () => {
    const context = string();

    const [_, error] = validateSync(context, true);

    expect(error).toBeInstanceOf(YumError);
  });
});
