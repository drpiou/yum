import { is } from '@drpiou/ts-utils';
import { hasShape } from '../rules/shape';
import { YumObject, YumObjectOptions, YumType } from '../types';
import createError from '../utils/createError';
import makeValidator from '../utils/makeValidator';

export default function object(options?: YumObjectOptions): YumObject {
  return {
    type: 'object',
    default: {},
    _validateObject: makeValidator((context, value, _options) => {
      if (!is.plainObject(value)) {
        throw createError('The :type field :label must be a plain object.', context, 'type', undefined, _options);
      }

      if (hasShape(context)) {
        value = context._validateShape(context, value, _options);
      }

      return value as Record<string, never>;
    }, options),
  };
}

export function isObject(yum: YumType): yum is YumObject {
  return yum.type === 'object';
}
