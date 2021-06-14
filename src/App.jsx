/* eslint-disable */
import React, { useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import * as postsAPI from './api/posts';
import { getAllUsers } from './api/users';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    postsAPI.getAllPosts().then(setPosts);
    getAllUsers().then(setUsers);
  }, []);

  const onSelectUser = (selectedUserId) => {
    +selectedUserId
      ? postsAPI.getUserPosts(selectedUserId).then(setPosts)
      : postsAPI.getAllPosts().then(setPosts);

    onUnselectPost();
  };

  const onSelectPost = (selectedPostId) => {
    setPostId(selectedPostId);
  };

  const onUnselectPost = () => {
    setPostId(0);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            onChange={(event) => {
              onSelectUser(event.target.value);
            }}
          >
            <option value="0">All users</option>
            {users.map(({ id, name }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            postId={postId}
            onSelectPost={onSelectPost}
            onUnselectPost={onUnselectPost}
          />
        </div>

        <div className="App__content">
          {/* {!!postId && <PostDetails postId={postId}/>} */}
          <PostDetails postId={postId} />
        </div>
      </main>
    </div>
  );
};

export default App;
