import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { User } from './react-app-env';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getUsers()
      .then(response => setUsers(response));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
            }}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={selectedUserId}
            postId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
          />
        </div>

        {selectedPostId !== 0 && (
          <div className="App__content">
            <PostDetails postId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
