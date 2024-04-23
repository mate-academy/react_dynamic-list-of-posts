import { createRoot } from 'react-dom/client';
import { App } from './App';

import { GlobalStateProvider } from './components/GlobalStateProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
