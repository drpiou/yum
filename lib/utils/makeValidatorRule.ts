import merge from 'lodash/merge';
import { YumOptionsWithMessages, YumValidateCallback } from '../types';

export default function makeValidatorRule<Callback extends YumValidateCallback>(
  callback: Callback,
  options?: YumOptionsWithMessages,
): Callback {
  return ((context, value, baseOptions) => {
    return callback(context, value, merge({}, baseOptions, options));
  }) as Callback;
}
