import { ErrorType } from './ErrorType';

export interface Error {
  type: ErrorType;
  errorText: string;
  errorValue: boolean;
}

export const initialErrorState: Error[] = [
  {
    type: 'PostsLoadingError',
    errorText: 'Something went wrong!',
    errorValue: false,
  },
  {
    type: 'CommentsError',
    errorText: 'Something went wrong',
    errorValue: false,
  },
];
