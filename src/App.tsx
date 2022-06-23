import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/api';

const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [post, setPost] = useState<Post | null>(null);
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    getUsers()
      .then(allUsers => setUsers(allUsers))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
            }}
          >
            <option value="0">All users</option>
            {users
              && users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={userId}
            setSelectedPostId={setSelectedPostId}
            selectedPostId={selectedPostId}
            setPost={setPost}
          />
        </div>
        {post
          && (
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
