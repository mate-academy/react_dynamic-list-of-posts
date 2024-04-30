import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UsersProvider } from './components/UsersContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <UsersProvider>
    <App />
  </UsersProvider>,
);
