import React, { useState } from 'react';
import './App.css';
import { PostList } from './components/PostList/PostList';
import { getPreparedPosts } from './api/api';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleStart = async () => {
    setIsLoaded(true);

    await getPreparedPosts().then(data => setPosts(data));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchValue(value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      setPosts(prev => (
        [...prev].sort((a, b) => (
          Number(b.title.includes(searchValue)) - Number(a.title.includes(searchValue))
        ))
      ));
    }
  };

  return (
    <div className="App">
      <h1>Static list of posts</h1>

      <p>
        <span>posts: </span>
        {posts.length}
      </p>

      { posts.length === 0
        ? (
          <button
            disabled={isLoaded}
            type="button"
            onClick={handleStart}
          >
            {!isLoaded ? 'Load' : 'Loading...'}
          </button>
        )
        : (
          <>
            <input
              type="text"
              onChange={handleChange}
              value={searchValue}
              onKeyUp={handleEnter}
              placeholder="Type word(s) and press Enter"
            />
            <PostList posts={posts} />
          </>
        )}
    </div>
  );
};

export default App;
