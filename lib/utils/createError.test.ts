import { describe, expect, test } from 'vitest';
import YumError from '../error';
import label from '../rules/label';
import string from '../types/string';
import createError from './createError';

describe('createError', () => {
  test('default', () => {
    const result = createError('', string(), 'type', undefined);

    expect(result).toBeInstanceOf(YumError);
  });

  test('messages', () => {
    const result = createError('', string(), 'type', undefined, { messages: { type: '' } });

    expect(result).toBeInstanceOf(YumError);
  });

  test('function', () => {
    const result = createError('', string(), 'type', undefined, { messages: { type: () => '' } });

    expect(result).toBeInstanceOf(YumError);
  });

  test('label', () => {
    const result = createError('', label('', string()), 'type', undefined);

    expect(result).toBeInstanceOf(YumError);
  });

  test('path', () => {
    const result = createError('', string(), 'type', undefined, { path: '__' });

    expect(result).toBeInstanceOf(YumError);
  });
});
