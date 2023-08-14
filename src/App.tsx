import { PostProvider } from './components/context/PostContext';
import { PostApp } from './components/PostApp/PostApp';

export const App: React.FC = () => (
  <PostProvider>
    <PostApp />
  </PostProvider>
);
