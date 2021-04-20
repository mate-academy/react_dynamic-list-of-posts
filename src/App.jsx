import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
// import { getUserPosts } from './api/posts';

export const App = () => {
  const [users, setUsers] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleChange = (clickEvent) => {
    const { value } = clickEvent.target;

    setSelectedUserId(value);
  };

  return (
    <div className="App">
      <header className="App__header">
        {users ? (
          <label>
            Select a user: &nbsp;

            <select
              className="App__user-selector"
              onChange={handleChange}
            >
              <option value="0">All users</option>
              {users.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <span>Users are not loaded</span>
        )}
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
};
