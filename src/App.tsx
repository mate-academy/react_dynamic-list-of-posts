import React, { useCallback, useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';

import { getAllUsers } from './api/users';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { User } from './types/User';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getAllUsers()
      .then(usersFromServer => setUsers(usersFromServer));
  }, []);

  const selectUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
  };

  const selectPostId = useCallback((postId: number) => {
    setSelectedPostId(postId);
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={String(selectedUserId)}
            onChange={selectUserId}
          >
            <option
              key="0"
              value="0"
            >
              all users
            </option>

            {users.map(({ id, name }) => (
              <option
                key={id}
                value={id}
              >
                {name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            onSelect={selectPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId
            ? <PostDetails selectedPostId={selectedPostId} />
            : <p>No post selected</p>}
        </div>
      </main>
    </div>
  );
};

export default App;
