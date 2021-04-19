import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  function handleSelectedPost(postId) {
    return setSelectedPostId(postId);
  }

  useEffect(() => {
    getUsers()
      .then(result => setUsers(result));
  }, []);

  useEffect(() => {
    getUserPosts(selectedUser)
      .then(result => setPosts(result));
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
            handleSelectedPost={handleSelectedPost}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails
            selectedPostId={selectedPostId}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
