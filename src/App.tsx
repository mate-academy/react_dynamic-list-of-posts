import React, { useState, FormEvent } from 'react';

import './App.css';
import { PostList } from './components/PostList/PostList';
import { loadPostsWithUsers } from './components/api';
import { PreparedPosts } from './components/types';

const App: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PreparedPosts[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PreparedPosts[]>([]);

  const handleButtonClick = async () => {
    setIsLoading(true);

    await loadPostsWithUsers().then(data => {
      setPosts(data);
      setFilteredPosts(data);
    });

    setLoaded(true);
  };

  const handleQuery = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setFilteredPosts(
      [...posts].filter(post => (
        post.title.toLowerCase().includes(value.toLowerCase())
      || post.body.toLowerCase().includes(value.toLowerCase()))),
    );
  };

  return (
    <div className="App">
      <h1>React dynamic list of Posts</h1>
      <div>
        {!isLoaded ? (
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleButtonClick}
              disabled={isLoading}
            >
              {isLoading ? 'loading...' : 'Load'}
            </button>
          </>
        ) : (
          <>
            <div>
              <input
                type="text"
                placeholder="search..."
                className="form-control form-control-lg"
                onChange={handleQuery}
              />
            </div>
            <div className="content">
              <PostList posts={filteredPosts} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
