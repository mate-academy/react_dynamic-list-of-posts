import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GlobalStateProvaider } from './State';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalStateProvaider>
    <App />
  </GlobalStateProvaider>,
);
