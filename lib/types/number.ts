import { is } from '@drpiou/ts-utils';
import { hasInclude } from '../rules/include';
import { hasRange } from '../rules/range';
import { YumNumber, YumNumberOptions, YumType } from '../types';
import createError from '../utils/createError';
import makeValidator from '../utils/makeValidator';
import validateMany from '../utils/validateMany';

export default function number(options?: YumNumberOptions): YumNumber {
  return {
    type: 'number',
    default: NaN,
    _validateNumber: makeValidator((context, value, _options) => {
      const cast = _options?.cast;
      const strict = _options?.strict;

      if (cast || (!strict && is.string(value))) {
        value = Number(value);
      }

      if (!(strict ? is.numberValid(value) : is.number(value))) {
        throw createError('The :type field :label must be of type number.', context, 'type', undefined, _options);
      }

      const _value = value as number;

      validateMany(
        [
          (): void => {
            if (hasRange(context)) {
              context._validateRange(context, _value, _options);
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

export function isNumber(yum: YumType): yum is YumNumber {
  return yum.type === 'number';
}
