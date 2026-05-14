import { createRoot } from 'react-dom/client';
import { App } from './App';
import { PostProvider } from './components/PostContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <PostProvider>
    <App />
  </PostProvider>,
);
