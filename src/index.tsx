import { createRoot } from 'react-dom/client';
import { App } from './App';
import React from 'react';
import { GlobalContextProvider } from './components/StateContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>,
);
