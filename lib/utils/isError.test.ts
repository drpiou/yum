import { describe, expect, test } from 'vitest';
import isError from './isError';
import makeError from './makeError';

describe('isError', () => {
  test('true', () => {
    const result = isError(makeError());

    expect(result).toBe(true);
  });

  test('false', () => {
    const result = isError(Error());

    expect(result).toBe(false);
  });
});
