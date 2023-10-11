import ReactDOM from 'react-dom';

import { App } from './App';
import { UsersProvider } from './context/UsersContext';
import { PostsProvider } from './context/PostsContext';
import { ErrorProvider } from './context/ErrorContext';
import { CommentsProvider } from './context/CommentsContext';

ReactDOM.render(
  <UsersProvider>
    <PostsProvider>
      <CommentsProvider>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </CommentsProvider>
    </PostsProvider>
  </UsersProvider>,
  document.getElementById('root'),
);
