import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';

import { User } from './types/User';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getAllUsers } from './api/users';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      const result = await getAllUsers();

      setUsers(result);
    };

    loadUsers();
  }, []);

  const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setSelectedPostId(null);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={selectUser}
          >
            <option value="0">All users</option>
            {users?.map(user => (
              <option value={user.id} key={user.id}>
                {user.name
                  ? user.name
                  : `Incognito user: id${user.id}`}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
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
