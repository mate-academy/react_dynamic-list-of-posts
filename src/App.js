import React, { useState } from 'react';
import { Input } from 'semantic-ui-react';
import './App.css';
import {
  getCommentsFromServer,
  getPostsFromServer,
  getUsersFromServer,
} from './api/Fetching';

import PostList from './components/PostList';

const debounce = (f, delay) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(f, delay, ...args);
  };
};

const App = () => {
  const [originalPosts, setOriginalPosts] = useState([]);
  const [mixedPosts, setMixedPosts] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isLoading, setLoad] = useState(false);
  const [isError, setError] = useState(false);
  const [searchValue, setInputValue] = useState('');

  let allData;

  const loadData = async() => {
    setLoad(true);

    try {
      const [postsData, usersData, commentsData] = await Promise.all([
        getPostsFromServer(),
        getUsersFromServer(),
        getCommentsFromServer(),
      ]);

      allData = postsData.map(
        post => ({
          ...post,
          user: usersData.find(
            user => post.userId === user.id
          ),
          comments: commentsData.filter(
            comment => post.id === comment.postId
          ),
        })
      );

      setOriginalPosts(allData);
      setMixedPosts(allData);
      setLoad(false);
      setLoaded(true);
    } catch (e) {
      setLoad(false);
      setError(true);
    }
  };

  const debounceSearching = debounce(value => setMixedPosts(
    originalPosts.filter(
      ({ title, body }) => (title + body).toLowerCase().includes(value)
    )
  ), 500);

  const searching = ({ target }) => {
    const value = target.value.toLowerCase().slice(0, 37);

    setInputValue(value);
    debounceSearching(value);
  };

  return (
    <div>
      <h1 className="header">Dynamic list of posts</h1>

      {isLoaded ? (
        <>
          <Input
            type="search"
            icon="search"
            placeholder="Search..."
            onChange={searching}
            value={searchValue}
            className="search-panel"
          />

          <PostList
            posts={mixedPosts}
            searchedResult={searchValue}
          />
        </>
      ) : (
        <>
          <h2>
            {isError ? 'Error' : ''}
          </h2>

          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        </>
      )}
    </div>
  );
};

export default App;
