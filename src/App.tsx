import React, { useState } from 'react';
import './App.css';
import { PostList } from './components/PostList/PostList';
import { getPreparedPosts } from './api/api';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const handleStart = async () => {
    setIsLoaded(true);

    await getPreparedPosts().then(data => {
      setPosts(data);
      setFilteredPosts(data);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchValue(value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      const filter = posts.filter(post => (
        post.title.includes(searchValue) || post.body.includes(searchValue)));

      setFilteredPosts(filter);
      setSearchValue('');
    }
  };

  return (
    <div className="App">
      <h1>Static list of posts</h1>

      <p>
        <span>posts: </span>
        {filteredPosts.length}
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
            <PostList posts={filteredPosts} />
          </>
        )}
    </div>
  );
};

export default App;
