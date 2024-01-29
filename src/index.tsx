import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UserProvider } from './components/UserContext/UserContext';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <UserProvider>
      <App />
    </UserProvider>,
  );
