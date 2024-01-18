import { createRoot } from 'react-dom/client';

import { GlobalStateProvider } from './Store';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>,
  );
