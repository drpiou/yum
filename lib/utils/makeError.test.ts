import { describe, expect, test } from 'vitest';
import YumError from '../error';
import makeError from './makeError';

describe('makeError', () => {
  test('default', () => {
    const result = makeError();

    expect(result).toBeInstanceOf(YumError);
  });

  test('message', () => {
    const result = makeError('');

    expect(result).toBeInstanceOf(YumError);
  });

  test('reasons', () => {
    const result = makeError('', { message: '', type: 'string', rule: 'type' });

    expect(result).toBeInstanceOf(YumError);
  });
});
