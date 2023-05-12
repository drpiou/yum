import { is } from '@drpiou/ts-utils';
import { hasFormat } from '../rules/format';
import { hasInclude } from '../rules/include';
import { hasRange } from '../rules/range';
import { hasRegex } from '../rules/regex';
import { YumString, YumStringOptions, YumType } from '../types';
import createError from '../utils/createError';
import makeValidator from '../utils/makeValidator';
import validateMany from '../utils/validateMany';

export default function string(options?: YumStringOptions): YumString {
  return {
    type: 'string',
    default: '',
    _validateString: makeValidator((context, value, _options) => {
      const cast = _options?.cast;
      const strict = _options?.strict;

      if (cast || (!strict && is.number(value))) {
        value = is.plainObject(value) ? JSON.stringify(value) : String(value);
      }

      if (!is.string(value)) {
        throw createError('The :type field :label must be of type string.', context, 'type', undefined, _options);
      }

      const _value = value;

      validateMany(
        [
          (): void => {
            if (hasRegex(context)) {
              context._validateRegex(context, _value, _options);
            }
          },
          (): void => {
            if (hasRange(context)) {
              context._validateRange(context, _value.length, _options);
            }
          },
          (): void => {
            if (hasFormat(context)) {
              context._validateFormat(context, _value, _options);
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

export function isString(yum: YumType): yum is YumString {
  return yum.type === 'string';
}
