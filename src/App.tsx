import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { User } from './types/user';
import { getUsers } from './api/posts';

const App: React.FC = () => {
  const [users, setUser] = useState<User[]>([]);
  const [selectedUserId, setUserId] = useState(0);
  const [selectedPostId, setPostId] = useState(0);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => setUser(usersFromServer));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => setUserId(+event.target.value)}
          >
            <option value={0}>All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
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
            setPostId={setPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails selectedPostId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
