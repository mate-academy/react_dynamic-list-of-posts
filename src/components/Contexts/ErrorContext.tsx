import React, { useState, useContext } from 'react';

interface ErrorContextType {
  error: string,
  setError: React.Dispatch<React.SetStateAction<string>>
}

const ErrorContext = React.createContext({} as ErrorContextType);

type Props = {
  children: React.ReactNode,
};

export const ErrorContextProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState('');

  const value = {
    error,
    setError,
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const error = useContext(ErrorContext);

  return error;
};
