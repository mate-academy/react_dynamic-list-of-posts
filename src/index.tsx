import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UsersProvider } from './store/UsersContext';
import { PostProvider } from './store/PostContext';
import { CommentsProvider } from './store/CommentsContext';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <UsersProvider>
      <PostProvider>
        <CommentsProvider>
          <App />
        </CommentsProvider>
      </PostProvider>
    </UsersProvider>,
  );
