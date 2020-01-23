import React, { useState } from 'react';
import './App.css';

import * as api from './api';
import PostsList from './PostList';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);

    const postsFromServer = await api.getPosts();

    setPosts(postsFromServer);
    setIsLoading(false);
    setIsLoaded(true);
  };

  return (
    <>
      <h1>Dynamic list of posts</h1>
      {isLoaded ? (
        <PostsList posts={posts} />
      ) : (
        <button
          type="button"
          onClick={loadData}
        >
          {isLoading ? (
            'Loading...'
          ) : (
            'Load'
          )}
        </button>
      )}
    </>
  );
};

export default App;
