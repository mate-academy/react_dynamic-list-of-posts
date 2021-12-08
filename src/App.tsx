import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { User } from './types/User';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setUserId] = useState(0);
  const [selectedPostId, setPostId] = useState(0);

  useEffect(() => {
    getUsers()
      .then(res => setUsers(res));
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
  };

  const selectPost = (postId: number) => {
    if (postId === selectedPostId) {
      setPostId(0);
    } else {
      setPostId(postId);
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="select"
            onChange={handleSelect}
          >
            <option value="0">
              select all users
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

        {!!selectedPostId && (
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
