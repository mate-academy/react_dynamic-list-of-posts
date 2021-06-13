import React, { useState, useEffect } from 'react';

import './App.scss';
import './styles/general.scss';

import { getUsers } from './api/users';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  const onUserSelected = (event) => {
    setSelectedUserId(+event.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={onUserSelected}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
            selectedUserId={selectedUserId}
            setIsLoading={setIsLoading}
          />
        </div>

        <div className="App__content">
          <PostDetails
            selectedPostId={selectedPostId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
