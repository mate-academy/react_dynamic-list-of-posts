import ReactDOM from 'react-dom';

import { App } from './App';
import { PostsContextProvider } from './Context/PostsContext';

ReactDOM.render(
  <PostsContextProvider>
    <App />
  </PostsContextProvider>,

  document.getElementById('root'),
);
