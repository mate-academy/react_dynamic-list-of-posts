import { createContext, useState, useMemo } from 'react';

export const ErrorContext = createContext<{
  isErrorHappen: boolean;
  setIsErrorHappen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
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
