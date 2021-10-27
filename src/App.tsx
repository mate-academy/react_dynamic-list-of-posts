import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => setUsers(usersFromServer));
  },
  []);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="selection_users">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
            }}
          >
            <option
              id="selection_users"
              value={0}
              key={0}
            >
              All users
            </option>
            {users.map(user => (
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
            userId={selectedUserId}
            selectPost={setSelectedPostId}
            selectedPost={selectedPostId}
          />
        </div>

        <div className="App__content">
          {!!selectedPostId
          && (
            <PostDetails
              selectedPost={selectedPostId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
