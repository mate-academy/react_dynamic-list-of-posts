import React, { useState } from 'react';
import './App.css';

import { getPreparedPosts } from './helpers/api';
import { PostList } from './components/PostList/PostList';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadTodos = () => {
    setIsLoaded(!isLoaded);

    getPreparedPosts()
      .then(data => {
        setPosts(data);
        setIsLoading(true);
      });
  };

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadTodos();
    }, 3000);
  };

  return (
    <div>
      <h1 className="title">Dynamic list of Posts</h1>
      {!isLoaded ? (
        <div className="button">
          <button type="button" onClick={handleLoading}>
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        </div>
      ) : (
        <div className="app">
          <PostList posts={posts} />
        </div>
      )}
    </div>
  );
};

export default App;
