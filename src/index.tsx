import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GlobalContextProvider } from './context/AppContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>,
);
