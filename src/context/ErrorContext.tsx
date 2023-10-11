import {
  createContext, useState, useMemo, useContext,
} from 'react';

interface ErrorContextType {
  isErrorHappen: boolean;
  setIsErrorHappen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ErrorContext = createContext<ErrorContextType>({
  isErrorHappen: false,
  setIsErrorHappen: () => {},
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [isErrorHappen, setIsErrorHappen] = useState(false);

  const value = useMemo(() => ({
    isErrorHappen,
    setIsErrorHappen,
  }), [isErrorHappen]);

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = (): ErrorContextType => {
  return useContext(ErrorContext);
};
