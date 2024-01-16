import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AppContextProvider } from './context/AppContext';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <AppContextProvider>
      <App />
    </AppContextProvider>,
  );
