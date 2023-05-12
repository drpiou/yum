import { describe, expect, test } from 'vitest';
import isErrorReasonRule from './isErrorReasonRule';
import makeError from './makeError';

describe('isErrorReasonRule', () => {
  test('true', () => {
    const context = makeError('', [{ message: '', type: 'string', rule: 'type' }]);

    const result = isErrorReasonRule(context.reasons[0], 'type');

    expect(result).toBe(true);
  });

  test('false', () => {
    const context = makeError('', [{ message: '', type: 'string', rule: 'type' }]);

    const reason = context.reasons[0];

    const result = isErrorReasonRule(reason, 'format');

    if (result) {
      const condition = reason.condition;
    }

    if (reason.rule === 'format') {
      const condition = reason.condition;
    }

    expect(result).toBe(false);
  });
});
