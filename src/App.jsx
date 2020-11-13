import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { request } from './api/api';

export const USERS_URL = '/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selUser, setSelUser] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await request(USERS_URL);
      const preparedUsers = response.data
        .filter(user => user.name);

      setUsers(preparedUsers);
    }

    fetchData();
  }, []);

  const userSelect = (event) => {
    const { value } = event.target;

    setSelUser(value);
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
            value={selUser}
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
            selUser={selUser}
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
