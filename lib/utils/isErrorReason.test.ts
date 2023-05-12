import { describe, expect, test } from 'vitest';
import isErrorReason from './isErrorReason';
import makeError from './makeError';

describe('isErrorReason', () => {
  test('true', () => {
    const context = makeError('', [{ message: '', type: 'string', rule: 'type' }]);

    const result = isErrorReason(context.reasons[0]);

    expect(result).toBe(true);
  });

  test('false', () => {
    const result = isErrorReason({});

    expect(result).toBe(false);
  });
});
