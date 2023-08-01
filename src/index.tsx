import ReactDOM from 'react-dom';

import { App } from './App';
import { PostProvider } from './context/PostContext';

ReactDOM.render(
  <PostProvider>
    <App />
  </PostProvider>,
  document.getElementById('root'),
);
