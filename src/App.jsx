import React, { useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';

import { getUsers } from './api/users';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [selectedUser, setUser] = useState('');
  const [selectedPostId, setPostId] = useState({});
  const [users, setUsers] = useState('');

  useEffect(() => {
    getUsers()
      .then(usersFromServer => setUsers(usersFromServer.data));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => setUser(event.target.value)}
          >
            <option value="0">All users</option>
            {!users || users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUser={selectedUser}
            setPostId={setPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId
          && (
          <PostDetails
            selectedPostId={selectedPostId}
          />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
