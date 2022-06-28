import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllUsers } from './api/api';

const App: React.FC = () => {
  const [getUserId, setGetUserId] = useState<number>(0);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [post, setPost] = useState<Post | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const allUsers = async () => {
      const usersFromServer = await getAllUsers();

      setUsers(usersFromServer.slice(0, 10));
    };

    allUsers();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={getUserId}
            onChange={event => {
              setGetUserId(+event.target.value);
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
            getUserId={getUserId}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
            setPost={setPost}
          />
        </div>

        <div className="App__content">
          {post && <PostDetails post={post} />}
        </div>
      </main>
    </div>
  );
};

export default App;
