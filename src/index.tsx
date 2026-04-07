import { createRoot } from 'react-dom/client';
import { App } from './App';
import { PostsProvider } from './context/PostsContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <PostsProvider>
    <App />
  </PostsProvider>,
);
