import React, { useState } from 'react';
import './App.css';
import { getPostsData } from './api';
import PostList from './components/PostList';

const App = () => {
  const [posts, setPosts] = useState<PreparedPost[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleDataFromServer = async () => {
    setLoading(true);
    try {
      const data = await getPostsData();

      setPosts(data);
    } catch (e) {
      setErrorMessage('Loading error');
    }

    setLoading(false);
  };

  return (
    <div className="app">
      {posts.length
        ? (
          <>
            <PostList posts={posts} />
          </>
        )
        : (
          <>
            <button
              className="load_button"
              type="button"
              onClick={handleDataFromServer}
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
            <div className="error">
              {errorMessage}
            </div>
          </>
        )}
    </div>
  );
};

export default App;
