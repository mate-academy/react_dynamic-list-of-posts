import ReactDOM from 'react-dom';

import { App } from './App';
import { UserContextProvider } from './components/Contexts/UserContext';
import { PostsContextProvider } from './components/Contexts/PostsContext';
import { CommentsContextProvider } from './components/Contexts/CommentsContext';

ReactDOM.render(
  <UserContextProvider>
    <PostsContextProvider>
      <CommentsContextProvider>
        <App />
      </CommentsContextProvider>
    </PostsContextProvider>
  </UserContextProvider>,
  document.getElementById('root'),
);
