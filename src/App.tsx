import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/posts';

const App: React.FC = () => {
  const [selectUser, setSelectUser] = useState(0);
  const [selectDetId, setSelectDetId] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

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
            onChange={event => setSelectUser(+event.target.value)}
          >
            <option value="0">All users</option>
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
            userId={selectUser}
            setSelectDetId={setSelectDetId}
            selectDetId={selectDetId}
          />
        </div>

        {selectDetId !== 0 && (
          <div className="App__content">
            <PostDetails postId={selectDetId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
