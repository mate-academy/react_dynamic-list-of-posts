import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UsersProvider } from './components/UsersContext';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <UsersProvider>
      <App />
    </UsersProvider>
  </Router>,
);
