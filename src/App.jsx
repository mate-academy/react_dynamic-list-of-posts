import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/posts';
import { getUsers } from './api/users';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getPosts()
      .then(data => setPosts(data));
    getUsers()
      .then(data => setUsers(data));
  }, []);

  const selectedUserPosts = (userId) => {
    if (userId !== 0) {
      getUserPosts(userId)
        .then(data => setPosts(data));
    } else {
      getPosts()
        .then(data => setPosts(data));
    }
  };

  const setSelectPost = (postId) => {
    if (postId === selectedPostId) {
      return setSelectedPostId(0);
    }

    return setSelectedPostId(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => selectedUserPosts(+event.target.value)}
          >

            <option value="0">All users</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
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
            selectedPostId={selectedPostId}
            setSelectPost={setSelectPost}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0
            ? <PostDetails selectedPostId={selectedPostId} />
            : 'No selected post'}
        </div>
      </main>
    </div>
  );
};

export default App;
