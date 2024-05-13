import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UserProvider } from './context/UserProvider';
import { PostProvider } from './context/PostProvider';
import { CommentProvider } from './context/CommentProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <UserProvider>
    <PostProvider>
      <CommentProvider>
        <App />
      </CommentProvider>
    </PostProvider>
  </UserProvider>,
);
