import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [post, setPost] = useState<Post | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const getUsersFromServer = useCallback(
    async () => {
      const response = await getUsers();

      setUsers(response);
    },
    [users],
  );

  useEffect(() => {
    getUsersFromServer();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(Number(event.target.value));
            }}
          >
            <option value="0">All users</option>

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
            setSelectedPostId={setSelectedPostId}
            setPost={setPost}
          />
        </div>

        <div className="App__content">
          {post === null
            ? <h2>Post details</h2>
            : <PostDetails post={post} />}
        </div>
      </main>
    </div>
  );
};

export default App;
