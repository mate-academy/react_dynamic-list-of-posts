import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { POSTS_URL, USERS_URL, COMMENTS_URL } from './const';
import { loadFromServer } from './api';
import PostList from './PostList';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const normalizePosts = (postsList, usersList, commentsList) => postsList.map(
    post => ({
      ...post,
      comments: commentsList.filter(comment => comment.postId === post.id),
      user: usersList.find(user => user.id === post.userId),
    })
  );

  const loadPosts = async() => {
    try {
      setIsLoading(true);
      setError('');

      const [postsList, usersList, commentsList] = await Promise.all([
        loadFromServer(POSTS_URL),
        loadFromServer(USERS_URL),
        loadFromServer(COMMENTS_URL),
      ]);

      const postsData = normalizePosts(postsList, usersList, commentsList);

      setPosts(postsData);
      setFilteredPosts(postsData);
      setIsLoading(false);
      setIsStarted(true);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  const filterPosts = (e) => {
    const searchQuery = e.target.value.trim().toLowerCase();

    setFilteredPosts(posts.filter(
      post => (post.title + post.body).toLowerCase().includes(searchQuery)
    ));
  };

  if (error) {
    return (
      <div className="post__start">
        <span className="error">{error}</span>
        <button
          disabled={isLoading}
          className="post__button"
          type="button"
          onClick={loadPosts}
        >
          {isLoading ? 'Loading...' : 'Try again'}
        </button>
      </div>
    );
  }

  return (
    <>
      {isStarted ? (
        <div className="post">
          <h1 className="title">Dynamic list of posts</h1>
          <DebounceInput
            debounceTimeout={500}
            placeholder="Type to search..."
            onChange={filterPosts}
          />
          <PostList posts={filteredPosts} />
        </div>
      ) : (
        <div className="post__start">
          <button
            disabled={isLoading}
            className="post__button"
            type="button"
            onClick={loadPosts}
          >
            {isLoading ? 'Loading...' : 'Load Posts'}
          </button>
        </div>
      )}
    </>
  );
};

export default App;
