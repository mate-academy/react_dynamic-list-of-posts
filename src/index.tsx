import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ListProvider } from './components/ListProvider/ListProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ListProvider>
    <App />
  </ListProvider>,
);
