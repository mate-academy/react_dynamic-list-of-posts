import ReactDOM from 'react-dom';

import { App } from './App';
import { PostsProvider } from './PostsContext';

ReactDOM.render(
  <PostsProvider>
    <App />
  </PostsProvider>,
  document.getElementById('root'),
);
