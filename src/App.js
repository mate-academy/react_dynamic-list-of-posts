import React, { useState } from 'react';
import './App.css';
import PostList from './PostList';
import { getUsers, getComments, getPosts } from './api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleLoading = async() => {
    setIsLoading(true);

    const [posts, comments, users] = await Promise.all([
      getPosts(),
      getComments(),
      getUsers(),
    ]);

    setIsLoading(false);
    setButtonStatus(false);

    const postsWithUsersAndComments = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    setLoadedPosts(postsWithUsersAndComments);
    setVisiblePosts(postsWithUsersAndComments);

    return postsWithUsersAndComments;
  };

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchFilter = () => {
    const filteredPosts = [...loadedPosts].filter(post => (
      post.title.includes(inputValue) || post.body.includes(inputValue)));

    setVisiblePosts(filteredPosts);
  };

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    );
  }

  return buttonStatus
    ? (
      <div className="box">
        <button
          type="button"
          onClick={handleLoading}
          className="filter__button button"
        >
          Load posts
        </button>
      </div>
    )
    : (
      <div className="App">
        <div>
          <input
            type="text"
            className="filter__input"
            onChange={handleInputValue}
          />
          <button
            type="button"
            className="filter__button"
            onClick={handleSearchFilter}
          >
            Search
          </button>
        </div>
        <PostList posts={visiblePosts} />
      </div>
    );
}

export default App;
