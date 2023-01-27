import ReactDOM from 'react-dom';

import { App } from './App';
import { PostsProvider } from './components/PostsContext';
import { UsersProvider } from './components/UsersContext';

ReactDOM.render(
  <UsersProvider>
    <PostsProvider>
      <App />
    </PostsProvider>
  </UsersProvider>,
  document.getElementById('root'),
);
