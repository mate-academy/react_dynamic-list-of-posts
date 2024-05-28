import { Error } from '../types/Error';

export const updateErrorStatus = (
  errors: Error[],
  errorType: Error['type'],
) => {
  return errors.map(error =>
    error.type === errorType ? { ...error, errorValue: true } : error,
  );
};

export const clearErrors = (errors: Error[]) => {
  return errors.map(error => ({ ...error, errorValue: false }));
};
