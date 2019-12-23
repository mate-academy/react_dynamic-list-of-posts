import React, { useState } from 'react';
import './App.scss';
import { getPosts, getUsers, getComments } from './api';
import PostList from './components/PostList';

const App = () => {
  const [originalPosts, setOriginalPosts] = useState([]);
  const [visiblePosts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isSearchError, setSearchError] = useState(false);
  const [isError, setError] = useState(false);

  const loadData = async() => {
    setLoading(true);

    try {
      const [
        posts,
        users,
        comments,
      ] = await Promise.all([getPosts(), getUsers(), getComments()]);

      const loadedPosts = posts.map(post => ({
        ...post,
        user: users.find(user => user.id === post.userId),
        comments: comments.filter(comment => comment.postId === post.id),
      }));

      setOriginalPosts(loadedPosts);
      setPosts(loadedPosts);
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  const debounce = (f, delay) => {
    let timerId = null;

    return (value) => {
      setSearchError(false);
      clearTimeout(timerId);
      timerId = setTimeout(f, delay, value);
    };
  };

  const debounced = (value) => {
    const filtered = originalPosts
      .filter(post => post.title.includes(value)
        || post.body.includes(value));

    if (filtered.length === 0) {
      setSearchError(true);
    } else {
      setPosts(filtered);
    }
  };

  const filterPosts = debounce(debounced, 300);

  return (
    <main className="list">
      <h1>Dynamic list of posts</h1>
      {visiblePosts.length !== 0 && (
        <section className="search-bar">
          <input
            type="text"
            placeholder="search post"
            className="input"
            onChange={event => filterPosts(event.target.value.trim())}
          />
          {isSearchError && (
            <p className="warning">
              There are no such posts, please try another search combination
            </p>
          )}
        </section>
      )}

      {isLoading && (
        <button
          type="button"
          className="button button--non-active"
        >
          Loading
        </button>
      )}
      {!isLoading && (visiblePosts.length === 0 ? (
        <button
          className="button"
          type="button"
          onClick={loadData}
        >
          Load
        </button>
      ) : (
        <PostList posts={visiblePosts} />
      ))}
      {isError && <p>There is an issue, please try again later</p>}
    </main>
  );
};

export default App;
