import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Store } from './Store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Store>
    <App />
  </Store>,
);
