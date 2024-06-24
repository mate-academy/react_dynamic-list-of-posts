import { createRoot } from 'react-dom/client';
import { App } from './App';
import React from 'react';
import { GlobalProvider } from './components/ToDoContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
