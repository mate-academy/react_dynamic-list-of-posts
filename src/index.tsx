import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AppContext } from './AppContext';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <AppContext>
      <App />
    </AppContext>,

  );
