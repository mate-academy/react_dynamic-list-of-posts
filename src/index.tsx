import { createRoot } from 'react-dom/client';
import { App } from './App';
import { PostStateProvider } from './PostsContext';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <PostStateProvider>
      <App />
    </PostStateProvider>,
  );
