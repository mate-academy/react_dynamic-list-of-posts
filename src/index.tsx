import ReactDOM from 'react-dom';

import { App } from './App';
import { UserProvider } from './components/Context/UserContext';
import { PostProvider } from './components/Context/PostContext';
import { CommentProvider } from './components/Context/CommentContext';

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
