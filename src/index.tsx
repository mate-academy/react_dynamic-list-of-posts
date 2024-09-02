import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UserContextProvider } from './components/context/UsersContext';
import { PostsContextProvider } from './components/context/PostsContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <UserContextProvider>
    <PostsContextProvider>
      <App />
    </PostsContextProvider>
  </UserContextProvider>,
);
