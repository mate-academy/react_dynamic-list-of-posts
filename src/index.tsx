import ReactDOM from 'react-dom';

import { App } from './App';
import { UsersProvide } from './UsersContext';
import { PostsProvide } from './PostsContext';
import { CommentsProvide } from './CommentsContext';

ReactDOM.render(
  <UsersProvide>
    <PostsProvide>
      <CommentsProvide>
        <App />
      </CommentsProvide>
    </PostsProvide>
  </UsersProvide>,
  document.getElementById('root'),
);
