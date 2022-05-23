import React, { useEffect, useState } from 'react';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { getUsersPosts } from './api/posts';

import './App.scss';
import './styles/general.scss';
import { Post } from './types/Post';

const App: React.FC<{}> = () => {
  const [posts, setPosts] = useState<Array<Post> | null>(null);

  useEffect(() => {
    getUsersPosts()
      .then((arrPosts) => {
        setPosts(arrPosts);
      });
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector">
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
          <PostsList posts={posts} />
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
};

export default App;
