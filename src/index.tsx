import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UserProvider } from './providers/UserProvider';
import { PostProvider } from './providers/PostProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <UserProvider>
    <PostProvider>
      <App />
    </PostProvider>
  </UserProvider>,
);
