import { is } from '@drpiou/ts-utils';
import { hasInclude } from '../rules/include';
import { hasRange } from '../rules/range';
import { YumDate, YumDateOptions, YumType } from '../types';
import createError from '../utils/createError';
import makeValidator from '../utils/makeValidator';
import validateMany from '../utils/validateMany';

export default function date(options?: YumDateOptions): YumDate {
  return {
    type: 'date',
    default: new Date(NaN),
    _validateDate: makeValidator((context, value, _options) => {
      const cast = _options?.cast;
      const strict = _options?.strict;

      if (cast || (!strict && is.datable(value))) {
        value = new Date(value as never);
      }

      if (!(strict ? is.dateValid(value) : is.date(value))) {
        throw createError('The :type field :label must be of type date.', context, 'type', undefined, _options);
      }

      const _value = value as Date;

      validateMany(
        [
          (): void => {
            if (hasRange(context)) {
              context._validateRange(context, _value.getTime(), _options);
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

export function isDate(yum: YumType): yum is YumDate {
  return yum.type === 'date';
}
