import { describe, expect, test } from 'vitest';
import YumError from '../error';
import makeError from './makeError';
import validateMany from './validateMany';

describe('validateMany', () => {
  test('pass', () => {
    expect(() => {
      validateMany([
        (): void => {
          return;
        },
        (): void => {
          return;
        },
      ]);
    }).not.toThrowError();
  });

  test('throw', () => {
    expect(() => {
      validateMany([
        (): void => {
          return;
        },
        (): void => {
          throw makeError();
        },
      ]);
    }).toThrowError(YumError);
  });

  test('first', () => {
    expect(() => {
      validateMany(
        [
          (): void => {
            return;
          },
          (): void => {
            throw makeError();
          },
        ],
        { first: true },
      );
    }).toThrowError(YumError);
  });

  test('error', () => {
    expect(() => {
      validateMany([
        (): void => {
          throw Error('__ERROR__');
        },
        (): void => {
          throw makeError();
        },
      ]);
    }).toThrowError('__ERROR__');
  });
});
