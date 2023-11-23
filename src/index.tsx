import ReactDOM from 'react-dom';

import { App } from './App';
import { UserProvider } from './components/UserContext';
import { PostProvider } from './components/PostContext';

ReactDOM.render(
  <UserProvider>
    <PostProvider>
      <App />
    </PostProvider>
  </UserProvider>,

  document.getElementById('root'),
);
