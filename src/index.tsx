import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UsersProvider } from './components/UserContext';
createRoot(document.getElementById('root') as HTMLElement).render(
  <UsersProvider>
    <App />
  </UsersProvider>,
);
