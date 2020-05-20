import React, { useState, useMemo } from 'react';
import './App.scss';
import { getPreparedPosts } from './api';
import PostList from './PostList';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isloading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loadPosts = async () => {
    setLoading(true);
    try {
     const preparedPosts = await getPreparedPosts()
     setPosts(preparedPosts);
    } catch(e) {
      setErrorMessage('Error, try again later')
    }
    setLoading(false);
  };

  const searchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    setQuery(target);
  };

  const filteredposts = useMemo(() => posts.filter(post => {
    return(post.title + post.body).toLowerCase().includes(query.trim().toLowerCase());
  }), [query, posts]);

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {!posts.length ? (
        <>
          <button
            type="button"
            className="button"
            onClick={loadPosts}
          >
            {isloading ? 'Loading...' : 'Click to Load'}
          </button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </>
      ) : (
        <>
          <input
            type="text"
            className="input"
            placeholder="what you search"
            onChange={searchQuery}
          />
          <PostList posts={filteredposts} />
        </>
      )}
    </div>
  );
};

export default App;
