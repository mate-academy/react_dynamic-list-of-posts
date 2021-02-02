import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import * as api from './api/posts';

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [userID, setUserID] = useState(0);
  const [postID, setPostID] = useState(null);

  useEffect(() => {
    if (!userID) {
      api.getAllPosts().then(setPosts);
    } else {
      api.getAllPosts()
        .then(postsFromApi => postsFromApi
          .filter(post => post.userId === userID))

        .then(setPosts);
    }
  }, [userID]);

  const handleUser = (event) => {
    setUserID(+event.target.value);
    setPostID(null);
  };

  const handlePost = (id) => {
    if (id === postID) {
      setPostID(null);

      return;
    }

    setPostID(id);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={handleUser}
          >
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            getPost={handlePost}
          />
        </div>

        <div className="App__content">
          { postID && <PostDetails postID={postID} />}
        </div>
      </main>
    </div>
  );
};
