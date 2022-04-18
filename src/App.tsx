import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllUsers } from './api/users';
import { User } from './types/User';

export const App: React.FC = () => {
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
              All users
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
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
            selectedUserId={selectedUserId}
            selectedPostId={selectedPostId}
            onSelectPostId={selectPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId
            ? <PostDetails selectedPostId={selectedPostId} />
            : (
              <h2>
                No post selected
              </h2>
            )}
        </div>
      </main>
    </div>
  );
};
