import { expect, test } from 'vitest';
import makeValidator from './makeValidator';

test('makeValidator', () => {
  const result = makeValidator(
    (context, value, options?) => {
      expect(options?.cast).toBe(false);
    },
    { cast: true },
  );

  result({} as never, '', { cast: false });
});
