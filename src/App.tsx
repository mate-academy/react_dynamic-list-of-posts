import React, { useState, useEffect } from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    getUsers()
      .then(userFromServer => setUsers(userFromServer));
  }, []);

  const handleUserChange = (userId: string) => {
    setSelectedUserId(userId);
    setSelectedPostId(null);
  };

  return (
    <div className="App">

      <label htmlFor="userSelect">
        Select a user: &nbsp;
        <select
          id="userSelect"
          className="App__user-selector"
          value={selectedUserId}
          onChange={event => handleUserChange(event.currentTarget.value)}
        >
          <option value="">All users</option>
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

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            selectedPostId={selectedPostId}
            onUserChange={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId ? (
            <PostDetails postId={selectedPostId} />
          ) : (
            <h2>No selected post </h2>
          )}
        </div>
      </main>
    </div>
  );
};
