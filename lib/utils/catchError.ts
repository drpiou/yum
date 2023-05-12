import YumError from '../error';
import isError from './isError';

export type CatchErrorReturnType<Result> = [result: Result, error: undefined] | [result: undefined, error: YumError];

export default function catchError<Result>(callback: () => Result): CatchErrorReturnType<Result> {
  const result = [undefined, undefined] as CatchErrorReturnType<Result>;

  try {
    result[0] = callback();
  } catch (error) {
    if (isError(error)) {
      result[1] = error;
    } else {
      throw error;
    }
  }

  return result;
}
