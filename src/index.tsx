import { createRoot } from 'react-dom/client';
import { App } from './App';
import { UserContextProvider } from './context/UserContextProvider';
import { PostContextProvider } from './context/PostContextProvider';
import { UserLoaderContextProvider } from './context/UserLoaderContextProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <UserLoaderContextProvider>
    <UserContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </UserContextProvider>
  </UserLoaderContextProvider>,
);
