import ReactDOM from 'react-dom';
import { PostsProvider } from './PostsContext';
import { App } from './App';

ReactDOM.render(
  <PostsProvider>
    <App />
  </PostsProvider>,
  document.getElementById('root'),
);
