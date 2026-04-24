import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UsersProvider } from './store/UsersProvider';
import { UserProvider } from './store/UserProvider';
import { PostsProvider } from './store/PostsProvider';
import { PostProvider } from './store/PostProvider';
import { CommentsProvider } from './store/CommentsProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <UsersProvider>
    <UserProvider>
      <PostsProvider>
        <PostProvider>
          <CommentsProvider>
            <App />
          </CommentsProvider>
        </PostProvider>
      </PostsProvider>
    </UserProvider>
  </UsersProvider>,
);
