import { hasOr } from '../rules/or';
import { YumMixed, YumOptions, YumType } from '../types';
import makeValidator from '../utils/makeValidator';

export default function mixed(options?: YumOptions): YumMixed {
  return {
    type: 'mixed',
    default: null,
    _validateMixed: makeValidator((context, value, _options) => {
      if (hasOr(context)) {
        value = context._validateOr(context, value, _options);
      }

      return value;
    }, options),
  };
}

export function isMixed(yum: YumType): yum is YumMixed {
  return yum.type === 'mixed';
}
