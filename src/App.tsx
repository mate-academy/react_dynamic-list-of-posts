import React, { useState } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { PreparedPost } from './interfaces';
import { makePosts } from './utils/preparePosts';
import { PostList } from './components/PostList/PostList';

const App = () => {
  const [posts, setPosts] = useState<PreparedPost[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const loadData = () => {
    setLoading(true);
    makePosts().then(data => {
      setPosts(data);
      setLoading(false);
      setLoaded(true);
    });
  };

  return (
    <div className="app">
      <h1>Dynamic list of posts</h1>
      {
        isLoaded
          ? <PostList posts={posts} />
          : (
            <Button
              onClick={loadData}
              content={isLoading ? 'Loading...' : 'Load'}
            />
          )
      }
    </div>
  );
};

export default App;
