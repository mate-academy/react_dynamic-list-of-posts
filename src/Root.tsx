import { App } from './App';
import { UsersProvider } from './store/UsersContext';
import { PostsProvider } from './store/PostsContext';
import { CommentsProvider } from './store/CommentsContext';

export const Root = () => (
  <UsersProvider>
    <PostsProvider>
      <CommentsProvider>
        <App />
      </CommentsProvider>
    </PostsProvider>
  </UsersProvider>
);
