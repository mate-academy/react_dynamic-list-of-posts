import React from 'react';
import './App.scss';
import { PostList } from './components/PostList';
import { useApp } from './useApp';

const App = () => {
  const {
    posts,
    isLoaded,
    isLoading,
    loadPosts,
  } = useApp();

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
