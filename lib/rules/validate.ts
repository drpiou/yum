import { is } from '@drpiou/ts-utils';
import { YumDefault, YumNullable, YumRequired, YumTypeBase, YumValidateOptions } from '../types';
import { isArray } from '../types/array';
import { isBoolean } from '../types/boolean';
import { isDate } from '../types/date';
import { isMixed } from '../types/mixed';
import { isNumber } from '../types/number';
import { isObject } from '../types/object';
import { isString } from '../types/string';
import catchError from '../utils/catchError';
import nullable, { hasNullable } from './nullable';
import { hasOr } from './or';
import required, { hasRequired } from './required';
import { hasTransform } from './transform';

export default function validate<Yum extends YumTypeBase>(
  yum: Yum,
  value: unknown,
  options?: YumValidateOptions,
): YumDefault<Yum> {
  if (!hasNullable(yum)) {
    yum = nullable(false, yum) as never;
  }

  if (!hasRequired(yum)) {
    yum = required(true, yum) as never;
  }

  const _yum = yum as YumNullable<boolean, YumRequired<boolean, Yum>>;

  if (hasTransform(_yum)) {
    value = _yum.transform(value);
  }

  const [, error] = catchError(() => {
    _yum._validateNullable(_yum, value, options);
    _yum._validateRequired(_yum, value, options);

    if (is.asserted(value)) {
      if (isMixed(_yum)) {
        value = _yum._validateMixed(_yum, value, options);
      } else if (isString(_yum)) {
        value = _yum._validateString(_yum, value, options);
      } else if (isNumber(_yum)) {
        value = _yum._validateNumber(_yum, value, options);
      } else if (isBoolean(_yum)) {
        value = _yum._validateBoolean(_yum, value, options);
      } else if (isDate(_yum)) {
        value = _yum._validateDate(_yum, value, options);
      } else if (isArray(_yum)) {
        value = _yum._validateArray(_yum, value, options);
      } else if (isObject(_yum)) {
        value = _yum._validateObject(_yum, value, options);
      }
    }
  });

  if (error) {
    if (options?.cast) {
      if (_yum.nullable && _yum.required) {
        value = null;
      } else if (!_yum.nullable && _yum.required) {
        value = hasOr(_yum) && _yum.or.length ? _yum.or[0].default : _yum.default;
      } else {
        value = undefined;
      }
    } else {
      throw error;
    }
  }

  return value;
}
