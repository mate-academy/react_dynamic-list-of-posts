import React, { useState } from 'react';
import './App.scss';
import { getData } from './api/fetch';
import PostList from './components/PostList';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

const App = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const loadData = async() => {
    setLoading(true);

    try {
      const postsData = await getData(POSTS_URL);
      const usersData = await getData(USERS_URL);
      const commentsData = await getData(COMMENTS_URL);

      const allData = postsData.map(
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

      setCombinedData(allData);
      setLoading(false);
      setLoaded(true);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const searchPosts = ({ target }) => {
    setInputValue(
      target.value.replace(/^\s+/, '').slice(0, 37)
    );
  };

  const visiblePosts = combinedData
    .filter(({ title, body }) => (title + body)
      .toLowerCase()
      .includes(inputValue.toLowerCase()));

  return (
    <div className="App">
      <h1 className="main-title">Dynamic list of posts</h1>

      {isLoaded ? (
        <>
          <input
            type="search"
            className="posts-search"
            placeholder="Search for posts"
            onChange={searchPosts}
            value={inputValue}
          />

          <PostList
            list={visiblePosts}
            highlightedSearchResult={inputValue}
          />
        </>
      ) : (
        <>
          {isError ? (
            <h2 className="sub-title">Error occured!!!</h2>
          ) : (
            <h2 className="sub-title">No PostsList yet!</h2>
          )}

          <button
            className="load-btn"
            type="button"
            onClick={loadData}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load TodoList'}
          </button>
        </>
      )}
    </div>
  );
};

export default App;
