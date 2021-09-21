import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentOptionId, setCurrentOptionId] = useState(0);
  const [currentPostId, setCurrentPostId] = useState(0);

  useEffect(() => {
    (async () => {
      const fetchUsers = await getUsers();

      setUsers(fetchUsers);
    })();
  }, []);

  const fetchPost = (id: number) => {
    setCurrentPostId(currentPostId === id ? 0 : id);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={e => setCurrentOptionId(parseInt(e.currentTarget.value, 10))}
          >
            <option value="0">All users</option>
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
            userId={currentOptionId}
            handlePostChange={fetchPost}
            currentPost={currentPostId}
          />
        </div>

        {currentPostId && (
          <div className="App__content">
            <PostDetails postId={currentPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
