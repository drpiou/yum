import { Asserted } from '@drpiou/ts-utils';
import YumError from '../error';
export default function isError<Error extends YumError>(error: unknown): error is Asserted<Error>;
