import { describe, expect, test } from 'vitest';
import YumError from '../error';
import makeError from './makeError';
import throwIfAll from './throwIfAll';

describe('throwIfAll', () => {
  test('pass', () => {
    expect(() => {
      throwIfAll([
        () => {
          return true;
        },
        () => {
          throw makeError();
        },
      ]);
    }).not.toThrowError();
  });

  test('throw', () => {
    expect(() => {
      throwIfAll([
        () => {
          throw makeError();
        },
        () => {
          throw makeError();
        },
      ]);
    }).toThrowError(YumError);
  });

  test('error', () => {
    expect(() => {
      throwIfAll([
        () => {
          throw Error('__ERROR__');
        },
        () => {
          throw makeError();
        },
      ]);
    }).toThrowError('__ERROR__');
  });
});
