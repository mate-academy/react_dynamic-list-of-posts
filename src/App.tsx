import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/post';

const App: React.FC = () => {
  const [selectedUserId, handleUserId] = useState(0);
  const [selectedPostId, handlePostId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(result => setUsers(result));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            id="select"
            className="App__user-selector"
            value={selectedUserId}
            onChange={event => handleUserId(+event.target.value)}
          >
            <option value="0">All users</option>
            {users && (
              users.map((user : User) => {

                return (
                  <option key={user.id} value={user.id}>{user.name}</option>
                );
              })
            )}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            selectedPostId={selectedPostId}
            handlePostId={handlePostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId ? (
            <PostDetails postId={selectedPostId} />
          ) : (
            <h2>Select post to see details</h2>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
