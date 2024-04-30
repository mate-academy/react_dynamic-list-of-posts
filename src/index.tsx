import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UsersContext } from './components/UsersContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <UsersContext>
    <App />
  </UsersContext>,
);
