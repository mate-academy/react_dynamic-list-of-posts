import React from 'react';
import { UserContextProvider } from './context/UserContext';
import { AppWithContexts } from './AppWithContexts';

export const App: React.FC = () => {
  return (
    <UserContextProvider>
      <AppWithContexts />
    </UserContextProvider>
  );
};
