import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { users } from './api/users';

const App: React.FC = () => {
  const [selectedUserId, changeUser] = useState('0');
  const [selectedPostId, changePostId] = useState(0);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="App__user-selector">
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            id="App__user-selector"
            value={selectedUserId}
            onChange={event => changeUser(event.target.value)}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>
      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={+selectedUserId}
            onPostSelect={changePostId}
            postId={selectedPostId}
          />
        </div>
        <div className="App__content">
          {selectedPostId > 0
            && (<PostDetails postId={selectedPostId} />)}
        </div>
      </main>
    </div>
  );
};

export default App;
