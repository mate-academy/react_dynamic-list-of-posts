import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/posts';

const App = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const loadAllPosts = () => {
    getPosts()
      .then((posts) => {
        setFilteredPosts(posts);
      });
  };

  useEffect(() => {
    loadAllPosts();
  }, []);

  useEffect(() => {
    if (selectedUser > 0) {
      getUserPosts(selectedUser)
        .then(setFilteredPosts);
    } else {
      loadAllPosts();
    }
  }, [selectedUser]);

  const selectPost = (postId) => {
    setSelectedPostId(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(+event.target.value);
            }}
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
            posts={filteredPosts}
            selectPost={selectPost}
          />
        </div>
        <div className="App__content">
          {selectedPostId > 0 && (
            <PostDetails postId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
