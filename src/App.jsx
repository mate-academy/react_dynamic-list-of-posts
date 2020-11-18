import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { fetchData } from './api/users';

export const USERS_URL = '/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState('');

  useEffect(() => {
    fetchData(setUsers);
  }, []);

  const userSelect = (event) => {
    const { value } = event.target;

    setSelectedUser(value);
  };

  const handlePostId = (id, isOpen) => {
    !isOpen ? setSelectedPostId(id) : setSelectedPostId('');
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUser}
            onChange={userSelect}
          >
            <option value="0">All users</option>
            {users.map((user, index) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))
            }
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUser={selectedUser}
            handlePostId={handlePostId}
            selectedPostId={selectedPostId}
          />
        </div>

        {selectedPostId && (
          <div className="App__content">
            <PostDetails
              selectedPostId={selectedPostId}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
