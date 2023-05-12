import { YumOptionsWithMessages, YumValidateCallback } from '../types';
export default function makeValidatorRule<Callback extends YumValidateCallback>(callback: Callback, options?: YumOptionsWithMessages): Callback;
