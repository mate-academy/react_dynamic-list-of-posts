import React, { useState, useEffect } from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts } from './api/post';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState(0);

  const loadPosts = (userId: number) => {
    getPosts(userId).then(loadedPosts => setPosts(loadedPosts));
  };

  const loadPost = (id: number) => {
    if (postId !== id) {
      setPostId(id);
    } else {
      setPostId(0);
    }
  };

  useEffect(() => {
    loadPosts(0);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            name="select"
            onChange={event => loadPosts(+event.target.value)}
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
            loadPost={loadPost}
            selectedPostId={postId}
          />
        </div>

        <div className="App__content">
          {postId ? <PostDetails postId={postId} /> : 'No selected post'}
        </div>
      </main>
    </div>
  );
};

export default App;
