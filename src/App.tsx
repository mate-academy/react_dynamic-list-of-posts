import React, { useState } from 'react';
import './App.scss';
import { getPreparedPosts } from './api/data';
import { PostList } from './components/PostList';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const loadPosts = () => {
    setLoading(true);

    getPreparedPosts()
      .then(data => setPosts(data));

    setLoading(false);
    setLoaded(true);
  };

  return (
    <main className="app">
      <div className="app__header">
        <h2 className="app__heading">Dynamic list of posts</h2>
        {!isLoading && !isLoaded
        && (
          <button
            type="button"
            className="waves-effect waves-light btn deep-purple accent-3"
            onClick={loadPosts}
          >
            load data
          </button>
        )}
        {isLoading && <p>Loading...</p>}
      </div>
      {isLoaded && <PostList posts={posts} />}
    </main>
  );
};

export default App;
