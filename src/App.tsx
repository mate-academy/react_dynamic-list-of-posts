import React, { useState, useEffect } from 'react';
import { loadUsers } from './api/post';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    (async () => {
      const usersFromApi = await loadUsers();

      setUsers(usersFromApi);
    })();
  }, []);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserId(+event.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={handleSelect}
          >
            <option value={0}>All users</option>
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
            selectedUserId={currentUserId}
            selectedPostId={selectedPostId}
            onSelectPost={setSelectedPostId}
          />
        </div>

        {selectedPostId > 0 && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
