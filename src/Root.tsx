import { App } from './App';
import { CommentsContextProvider } from './context/CommentsContext';
import { PostsContextProvider } from './context/PostsContext';
import { UserContextProvider } from './context/UserContext';

const Root: React.FC = () => (
  <UserContextProvider>
    <PostsContextProvider>
      <CommentsContextProvider>
        <App />
      </CommentsContextProvider>
    </PostsContextProvider>
  </UserContextProvider>
);

export default Root;
