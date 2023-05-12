import { is } from '@drpiou/ts-utils';
import { YumBoolean, YumBooleanOptions, YumType } from '../types';
import createError from '../utils/createError';
import makeValidator from '../utils/makeValidator';

export default function boolean(options?: YumBooleanOptions): YumBoolean {
  return {
    type: 'boolean',
    default: false,
    _validateBoolean: makeValidator((context, value, _options) => {
      const cast = _options?.cast;
      const strict = _options?.strict;

      if (cast) {
        value = Boolean(value);
      } else if (!strict && is.booleanLike(value)) {
        value = [true, 'true', 1].indexOf(value) !== -1;
      }

      if (!is.boolean(value)) {
        throw createError('The :type field :label must be of type boolean.', context, 'type', undefined, _options);
      }

      return value;
    }, options),
  };
}

export function isBoolean(yum: YumType): yum is YumBoolean {
  return yum.type === 'boolean';
}
