import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GlobalstateProvider } from './components/store/store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalstateProvider>
    <App />
  </GlobalstateProvider>,
);
