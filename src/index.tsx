import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UsersProvaider } from './context/UserContext';
import { PostsProvider } from './context/ContextProvider';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <UsersProvaider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </UsersProvaider>,
  );
