import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GlobalProvider } from './lib/GlobalContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
