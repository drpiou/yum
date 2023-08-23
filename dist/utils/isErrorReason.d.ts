import { Asserted } from '@drpiou/ts-utils';
import { YumErrorReason } from '../types';
export default function isErrorReason<Reason extends YumErrorReason>(error: unknown): error is Asserted<Reason>;
