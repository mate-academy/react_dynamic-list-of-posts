import ReactDOM from 'react-dom';

import { App } from './App';
import { PostProvider } from './PostsProvider';

ReactDOM.render(
  <PostProvider>
    <App />
  </PostProvider>,
  document.getElementById('root'),
);
