import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import './App.css';

import { getPosts } from './api/posts';
import { getUsers } from './api/users';
import { getComments } from './api/comments';

import PostList from './PostList';

const App = () => {
  const [isLoaded, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const mergeData = (posts, users, comments) => {
    const data = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    setPostsData(data);
    setSearchData(data);
  };

  const loadData = async() => {
    setLoading(true);
    const [posts, users, comments] = await Promise.all(
      [getPosts(), getUsers(), getComments()]
    );

    mergeData(posts, users, comments);
    setLoading(false);
    setLoad(true);
  };

  const handleSearch = ({ target }) => {
    const inputValue = target.value.trim().toLowerCase();

    const searchValues = postsData.filter(
      ({ title, body }) => (title + body).toLowerCase().includes(inputValue)
    );

    setSearchData(searchValues);
  };

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="App">
      {isLoaded
        ? (
          <>
            <DebounceInput
              className="search"
              type="search"
              debounceTimeout={500}
              placeholder="search"
              onChange={event => handleSearch(event)}
            />
            <PostList posts={searchData} />
          </>
        )
        : (
          <button
            type="button"
            className="post__button"
            onClick={loadData}
          >
            Load
          </button>
        )
      }
    </div>
  );
};

export default App;
