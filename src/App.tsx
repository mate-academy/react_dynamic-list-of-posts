import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getUsers } from './api/users';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, selectUser] = useState<string>('');
  const [selectedPost, selectPost] = useState<string>('');

  useEffect(() => {
    (async () => {
      const usersFromAPI = await getUsers();

      setUsers(usersFromAPI);
    })();
  }, []);

  const userSelector = (userId: string) => {
    selectUser(userId);
    selectPost('');
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="selection_users">
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            value={selectedUser || 0}
            onChange={(event) => userSelector(event.currentTarget.value)}
          >
            <option value="0" id="selection_users">All users</option>
            {users.map(user => {
              return (
                <option
                  value={`${user.id}`}
                  key={user.id}
                >
                  {user.name}
                </option>
              );
            })}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUser={selectedUser}
            selectPost={selectPost}
            selectedPost={selectedPost}
          />
        </div>

        <div className="App__content">
          {
            selectedPost !== '0'
              ? <PostDetails selectedPost={selectedPost} />
              : <h2>Select post to see details</h2>
          }
        </div>
      </main>
    </div>
  );
};

export default App;
