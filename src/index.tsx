import { createRoot } from 'react-dom/client';
import { App } from './App';
import React from 'react';
import { GlobarProvider } from './context/ContextReducer';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobarProvider>
    <App />
  </GlobarProvider>,
);
