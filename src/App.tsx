import React, { FC, useState } from 'react';
import './App.css';
import { loadPreparedPosts } from './api';
import { PostList } from './components/PostList/PostList';

const App: FC = () => {
  const [isLoaded, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState<PreparedPosts>([]);
  const [query, setQuery] = useState('');

  const handleLoad = () => {
    setLoading(true);
    loadPreparedPosts().then(newPosts => {
      setPosts(newPosts);
      setLoad(true);
      setLoading(false);
    });
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
  };

  const filteredPosts = posts.filter(post => (
    post.title.toLowerCase().includes(query.toLowerCase())
    || post.body.toLowerCase().includes(query.toLowerCase())
  ));

  return (
    <div className="wrapper">
      {isLoaded
        ? (
          <PostList
            posts={filteredPosts}
            onInputChange={handleChange}
            inputValue={query}
          />
        )
        : (
          <div className="front-page">
            <div className="front-page__wrapper">
              <h1 className="front-page__title">Dynamic list of posts</h1>
              <button
                className="front-page__btn"
                type="button"
                onClick={handleLoad}
              >
                {!isLoading ? <span>Load</span> : <span>Loading...</span>}
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default App;
