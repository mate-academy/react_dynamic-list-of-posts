import React, { useState } from 'react';
import './App.css';
import { PostList } from './components/PostList';
import { preparedPosts } from './api';

const App: React.FC = () => {
  const [isLoaded, setLoad] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PreparedPosts>([]);
  const [query, setQuery] = useState<string>('');

  const handleLoadData = () => {
    setLoading(true);
    preparedPosts().then(newPosts => {
      setPosts(newPosts);
      setLoad(true);
      setLoading(false);
    });
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(evt.target.value);
  };

  const filteredPosts = posts.filter(post => (
    post.title.toLowerCase().includes(query.toLowerCase())
    || post.body.toLowerCase().includes(query.toLowerCase())
  ));

  return (
    <div className="container">
      <h1 className="header-text">Dynamic list of posts</h1>
      {
        isLoaded
          ? (
            <PostList
              posts={filteredPosts}
              onInputChange={handleChange}
              inputValue={query}
            />
          )
          : (
            <button
              type="button"
              className="button"
              onClick={handleLoadData}
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
          )
      }
    </div>
  );
};

export default App;
