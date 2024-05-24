import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GlobalPostsProvider } from './context/GlobalPostsProvider';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalPostsProvider>
    <App />
  </GlobalPostsProvider>
);
