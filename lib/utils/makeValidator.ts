import merge from 'lodash/merge';
import { YumOptionsWithMessages, YumValidateCallback } from '../types';

export default function makeValidator<Callback extends YumValidateCallback>(
  callback: Callback,
  baseOptions?: YumOptionsWithMessages,
): Callback {
  return ((context, value, options) => {
    return callback(context, value, merge({}, baseOptions, options));
  }) as Callback;
}
