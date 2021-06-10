import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getData } from './api/api';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setUser] = useState(0);
  const [postId, setPostId] = useState(0);

  const getUsers = async() => {
    const usersFromServer = await getData('/users');

    setUsers(usersFromServer);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={({ target }) => {
              setUser(+target.value);
            }}
          >
            <option value="0">Choose a user</option>
            {users ? users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            )) : (
              <option>Loading...</option>
            )}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedPostId={postId}
            onSetPostId={setPostId}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <PostDetails selectedPostId={postId} />
        </div>
      </main>
    </div>
  );
};

export default App;
