import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    getUserPosts(+selectedUserId).then(setPosts);
  }, [selectedUserId]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={event => setSelectedUserId(event.target.value)}
          >
            <option value="">All users</option>
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
            posts={posts}
            setPostId={setSelectedPostId}
          />
        </div>

        {selectedPostId && (
          <div className="App__content">
            <PostDetails
              postId={selectedPostId}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
