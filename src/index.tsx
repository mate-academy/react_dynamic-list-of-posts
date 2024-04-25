import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UserProvider } from './contexts/userContext';
import { PostProvider } from './contexts/postContext';
import { NewCommetProvider } from './contexts/newCommentContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <UserProvider>
    <PostProvider>
      <NewCommetProvider>
        <App />
      </NewCommetProvider>
    </PostProvider>
  </UserProvider>,
);
