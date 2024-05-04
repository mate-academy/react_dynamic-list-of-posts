import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ContextProvider } from './context/store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
);
