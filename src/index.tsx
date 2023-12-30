import { createRoot } from 'react-dom/client';
import { App } from './App';
import { PostProvider } from './context/PostProvider';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <PostProvider>
      <App />
    </PostProvider>,
  );
