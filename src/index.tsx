import ReactDOM from 'react-dom';

import { App } from './App';
import { CommentsProvider } from './CommentsContext';
import { PostProvider } from './PostContext';

ReactDOM.render(
  <PostProvider>
    <CommentsProvider>
      <App />
    </CommentsProvider>
  </PostProvider>,
  document.getElementById('root'),
);
