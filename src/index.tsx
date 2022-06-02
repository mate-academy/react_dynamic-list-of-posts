import ReactDOM from 'react-dom';

import { App } from './App';
import { PostsProvider } from './PostsContext';

const Root = () => (
  <PostsProvider>
    <App />
  </PostsProvider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
