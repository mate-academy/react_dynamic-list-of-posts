import ReactDOM from 'react-dom';

import { App } from './App';
import { PostProvider } from './PostProvider';
import { UserProvider } from './UserProvider';

ReactDOM.render(
  <UserProvider>
    <PostProvider>
      <App />
    </PostProvider>
  </UserProvider>,
  document.getElementById('root'),
);
