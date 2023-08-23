import { YumOptionsWithMessages, YumValidateCallback } from '../types';
export default function makeValidator<Callback extends YumValidateCallback>(callback: Callback, baseOptions?: YumOptionsWithMessages): Callback;
