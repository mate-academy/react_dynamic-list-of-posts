import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GlobalProvider } from './GlobalContext';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
);
