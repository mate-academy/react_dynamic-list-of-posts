import React from 'react';
import { AppContexts } from './AppContexts';
import { ContextProvider } from './context/context';

export const App: React.FC = () => {
  return (
    <ContextProvider>
      <AppContexts />
    </ContextProvider>
  );
};
