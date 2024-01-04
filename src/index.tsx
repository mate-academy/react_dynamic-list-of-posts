import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UsersProvaider } from './context/UsersContext';
import { PostsProvider } from './context/PostsContext';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <UsersProvaider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </UsersProvaider>,
  );
