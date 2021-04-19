import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';

const App = () => {
  const [userId, setSelectedUsedId] = useState(0);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState();
  const selectUser = (event) => {
    setSelectedUsedId(event.target.value);
    getUserPosts(event.target.value, setPosts);
  };

  useEffect(() => {
    getUserPosts(userId, setPosts);
  }, [userId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            value={userId}
            onChange={selectUser}
            className="App__user-selector"
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
            selectPost={setSelectedPost}
            selectedPost={selectedPost}
          />
        </div>

        {selectedPost
          && (
          <div className="App__content">
            <PostDetails postId={selectedPost} />
          </div>
          )}
      </main>
    </div>
  );
};

export default App;
