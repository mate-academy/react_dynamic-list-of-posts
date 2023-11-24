import ReactDOM from 'react-dom';

import { App } from './App';
import { UserProvider } from './components/UserContext';
import { PostProvider } from './components/PostContext';
import { CommentProvider } from './components/CommentContext';

ReactDOM.render(
  <UserProvider>
    <PostProvider>
      <CommentProvider>
        <App />
      </CommentProvider>
    </PostProvider>
  </UserProvider>,

  document.getElementById('root'),
);
