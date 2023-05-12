import { is } from '@drpiou/ts-utils';
import castArray from 'lodash/castArray';
import { hasInclude } from '../rules/include';
import { hasOf } from '../rules/of';
import { hasRange } from '../rules/range';
import { YumArray, YumArrayOptions, YumType } from '../types';
import createError from '../utils/createError';
import makeValidator from '../utils/makeValidator';
import validateMany from '../utils/validateMany';

export default function array(options?: YumArrayOptions): YumArray {
  return {
    type: 'array',
    default: [],
    _validateArray: makeValidator((context, value, _options) => {
      const cast = _options?.cast;

      if (cast) {
        value = castArray(value);
      }

      if (!is.array(value)) {
        throw createError('The :type field :label must be of type array.', context, 'type', undefined, _options);
      }

      if (hasOf(context)) {
        value = context._validateOf(context, value, _options);
      }

      const _value = value as unknown[];

      validateMany(
        [
          (): void => {
            if (hasRange(context)) {
              context._validateRange(context, _value.length, _options);
            }
          },
          (): void => {
            if (hasInclude(context)) {
              context._validateInclude(context, _value, _options);
            }
          },
        ],
        _options,
      );

      return _value;
    }, options),
  };
}

export function isArray(yum: YumType): yum is YumArray {
  return yum.type === 'array';
}
