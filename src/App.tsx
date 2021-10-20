import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getUsers()
      .then(result => setUsers(result));
  }, []);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  const selectPost = (postId: number) => {
    if (postId === selectedPostId) {
      setSelectedPostId(0);
    } else {
      setSelectedPostId(postId);
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select-user">
          Select a user: &nbsp;
          <select
            id="select-user"
            onChange={handleSelect}
          >
            <option
              value={0}
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
            selectPost={selectPost}
          />
        </div>

        {selectedPostId > 0 && (
          <div className="App__content">
            <PostDetails
              selectedPostId={selectedPostId}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
