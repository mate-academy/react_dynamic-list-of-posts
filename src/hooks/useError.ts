import { useCallback, useState } from 'react';

export type ErrorState = {
  message: string;
  id: number | null;
};

const DEFAULT_ERROR_MESSAGE = 'Something went wrong';
const NO_ERROR_STATE: ErrorState = {
  message: '',
  id: null,
};

export const useError = () => {
  const [error, setError] = useState<ErrorState>(NO_ERROR_STATE);

  const setErrorMessage = useCallback((message?: string) => {
    setError({
      message: message || DEFAULT_ERROR_MESSAGE,
      id: Date.now(),
    });
  }, []);

  const clearErrorMessage = useCallback(() => {
    setError(NO_ERROR_STATE);
  }, []);

  return { error, setErrorMessage, clearErrorMessage };
};
