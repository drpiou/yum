import YumError from '../error';
export type CatchErrorReturnType<Result> = [result: Result, error: undefined] | [result: undefined, error: YumError];
export default function catchError<Result>(callback: () => Result): CatchErrorReturnType<Result>;
