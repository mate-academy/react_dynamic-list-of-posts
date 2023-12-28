import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UsersProvider } from './store/UsersContext';
import { PostsProvider } from './store/PostsContext';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <UsersProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </UsersProvider>,
  );
