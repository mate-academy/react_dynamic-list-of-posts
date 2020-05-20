import React, { useState } from 'react';
import './App.scss';
import { getPosts } from './helpers/api';
import { PostList } from './components/PostList';

const App = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLoadClick() {
    setIsLoading(true);

    try {
      const preparedPosts = await getPosts();

      setPosts(preparedPosts);
    } catch (error) {
      setErrorMessage('Loading error, please try again later');
    }

    setIsLoading(false);
  }

  return (
    <div className="app__header">
      <h1 className="heading">Dynamic list of posts</h1>
      {!posts.length
        ? (
          <>
            <button
              type="button"
              className="loading__btn"
              onClick={handleLoadClick}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
            {errorMessage && <span className="error">{errorMessage}</span>}
          </>
        )
        : (
          <PostList posts={posts} />
        )}
    </div>
  );
};

export default App;
