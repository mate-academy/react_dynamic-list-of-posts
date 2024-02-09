import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UsersProvider } from './contexts/UsersProvider';
import { PostsProvider } from './contexts/PostProvider';
import { CommentsProvider } from './contexts/CommentsProvider';

const Root = () => (
  <UsersProvider>
    <PostsProvider>
      <CommentsProvider>
        <App />
      </CommentsProvider>
    </PostsProvider>
  </UsersProvider>

);

createRoot(document.getElementById('root') as HTMLElement)
  .render(<Root />);
