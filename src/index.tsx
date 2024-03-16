import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UsersProvider } from './context/UsersContext';
import { PostsProvider } from './context/PostsContext';
import { CommentsProvider } from './context/CommentsContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <UsersProvider>
    <PostsProvider>
      <CommentsProvider>
        <App />
      </CommentsProvider>
    </PostsProvider>
  </UsersProvider>,
);
