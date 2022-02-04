import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState(0);
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    (async () => {
      const newUsers = await getUsers();

      setUsers(newUsers);
    })();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setPostId(0);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="userSelect">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="userSelect"
            value={userId}
            onChange={handleChange}
          >
            <option value={0}>All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={userId}
            onPostChange={setPostId}
            postId={postId}
          />
        </div>

        <div className="App__content">
          {postId ? (
            <PostDetails postId={postId} />
          ) : (
            <p>No selected post</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
