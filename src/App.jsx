import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { getPosts, getUserPosts } from './api/posts';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getPosts()
      .then(result => setPosts(result));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              getUserPosts(+event.target.value)
                .then(result => setPosts(result));
            }}
          >
            <option value="0">All users</option>
            <option value="1">Leanne Graghm</option>
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
            selectedPostId={selectedPostId}
            onSelect={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {(selectedPostId === 0)
            ? 'No post selected'
            : (
              <PostDetails postId={selectedPostId} />
            )
          }
        </div>
      </main>
    </div>
  );
};

export default App;
