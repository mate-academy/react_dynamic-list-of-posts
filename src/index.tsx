import { createRoot } from 'react-dom/client';
import { App } from './App';
import { PostContextProvider } from './utils/PostContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <PostContextProvider>
    <App />
  </PostContextProvider>
);
