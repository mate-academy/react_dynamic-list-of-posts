import React, { useState } from 'react';
import './App.css';

import { getPosts } from './api/api';
import { PostWithUser } from './api/api';

import PostList from './components/PostList';

const App = () => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMesage] = useState('');

  async function handleLoadClick() {
    setIsLoading(true);

    try {
      const preparedPosts = await getPosts();
      setPosts(preparedPosts);
    } catch (error) {
      setErrorMesage('Loading error, please try again later')
    }

    setIsLoading(false);
  };

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {posts.length === 0 ? (
        <>
          <button type="button" onClick={handleLoadClick} disabled={isLoading}>
            {isLoading ? 'Loading' : 'Load'}
          </button>
          {errorMessage && <span className="error">{errorMessage}</span>}
        </>

      ) : (
          <PostList posts={posts} />
        )}
    </div>
  )
}


export default App;
