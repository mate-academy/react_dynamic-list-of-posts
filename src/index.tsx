import { createRoot } from 'react-dom/client';
import { App } from './App';
import { PostsProvider } from './components/PostsProvider';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <PostsProvider>
      <App />
    </PostsProvider>,
  );
