import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { getUsers } from './api/api';
import { getPosts, getPostsByUser } from './api/posts';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedUser, setSelectedUser] = useState(0);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser === 0) {
      getPosts().then(setPosts);

      return;
    }

    getPostsByUser(selectedUser).then(setPosts);
  }, [selectedUser]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => setSelectedUser(+event.target.value)}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
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
            selectedPostId={selectedPostId}
            onPostSelected={(postId) => {
              if (postId === selectedPostId) {
                setSelectedPostId(0);
              } else {
                setSelectedPostId(postId);
              }
            }}
          />
        </div>

        <div className="App__content">
          <PostDetails postId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
