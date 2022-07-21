import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { User } from './types/user';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | []>([]);
  const [selecteduUserId, setSelectedUserId] = useState<number>(0);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    getUsers()
      .then(loadedUsers => setUsers(loadedUsers));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={
              (event) => setSelectedUserId(+event.target.value)
            }
          >
            <option value="0" selected>
              All users
            </option>

            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
                (#
                {user.id}
                )
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUser={selecteduUserId}
            selectedPostId={selectedPostId}
            onPostSelect={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId && <PostDetails selectedPostId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
