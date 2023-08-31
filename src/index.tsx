import ReactDOM from 'react-dom';

import { App } from './App';
import { PostsProvider } from './PostsContext';
import { UsersProvider } from './UsersContext';

ReactDOM.render(
  <UsersProvider>
    <PostsProvider>
      <App />
    </PostsProvider>
  </UsersProvider>,
  document.getElementById('root'),
);
