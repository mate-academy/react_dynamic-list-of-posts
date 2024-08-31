import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

import { AppContextProvider } from './BLoC/App/AppContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  ) as React.ReactElement,
);
