import { createRoot } from 'react-dom/client';
import { App } from './App';
import { SelectedUserProvider } from './providers/UserProvider';
import { SelectedPostProvider } from './providers/PostProvider';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <SelectedUserProvider>
      <SelectedPostProvider>
        <App />
      </SelectedPostProvider>
    </SelectedUserProvider>,
  );
