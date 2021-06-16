import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getPosts, getUserPosts } from './api/posts';
import { getUsers } from './api/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userChooseId, setUserChooseId] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    if (userChooseId) {
      getUserPosts(userChooseId)
        .then(setPosts);
    } else {
      getPosts()
        .then(setPosts);
    }
  }, [userChooseId]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const selectedPost = (postId) => {
    if (selectedPostId !== postId) {
      setSelectedPostId(postId);
    } else {
      setSelectedPostId(0);
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userChooseId}
            onChange={({ target }) => {
              setUserChooseId(target.value);
            }}
          >
            <option value="">All users</option>
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
            onClickSelectPost={selectedPost}
            postId={selectedPostId}
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
