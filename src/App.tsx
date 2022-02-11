import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [selectedUserId, setUserId] = useState(0);
  const [selectedPostId, setPostId] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  useEffect(() => {
    const loadUsers = async () => {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    };

    loadUsers();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="userSelect">
          Select a user: &nbsp;

          <select
            id="userSelect"
            className="App__user-selector"
            onChange={handleUserSelect}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={selectedUserId}
            selectedPostId={selectedPostId}
            setPostId={setPostId}
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

/* <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option> */
