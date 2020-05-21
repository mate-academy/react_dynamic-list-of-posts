import React, { useState } from 'react';
import './App.scss';

import { getPosts, PostWithUser } from './api';

import PostList from './components/PostList';

const App = () => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLoadClick() {
    setIsLoading(true);

    try {
      const preparedPosts = await getPosts();

      setPosts(preparedPosts);
    } catch (error) {
      setErrorMessage('Error, check your connection and try again');
    }

    setIsLoading(false);
  }

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {posts.length === 0 ? (
        <>
          <button
            type="button"
            onClick={handleLoadClick}
            disabled={isLoading}
            className="App__button"
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
          {errorMessage && <span>{errorMessage}</span>}
        </>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
};

export default App;
