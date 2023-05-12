import { expect, test } from 'vitest';
import makeValidatorRule from './makeValidatorRule';

test('makeValidatorRule', () => {
  const result = makeValidatorRule(
    (context, value, options?) => {
      expect(options?.cast).toBe(true);
    },
    { cast: true },
  );

  result({} as never, '', { cast: false });
});
