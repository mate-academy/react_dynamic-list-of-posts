import React, { useState } from 'react';
import './App.scss';
import { getPostsFromServer } from './api/getPostsFromServer';
import { getUsersFromServer } from './api/getUsersFromServer';
import { getCommentsFromServer } from './api/getCommentsFromServer';
import { debounce } from './helpers/debounce';
import PostList from './components/PostList';

const App = () => {
  const [combinedPosts, setCombinedPosts] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [searchValue, setInputValue] = useState('');

  let allData;

  const loadData = async() => {
    setLoading(true);

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
      setCombinedPosts(allData);
      setLoading(false);
      setLoaded(true);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const applySearchWithDebounce = debounce(value => setCombinedPosts(
    originalPosts.filter(
      ({ title, body }) => (title + body).toLowerCase().includes(value)
    )
  ), 500);

  const searchPosts = ({ target }) => {
    const value = target.value.toLowerCase().slice(0, 37);

    setInputValue(value);
    applySearchWithDebounce(value);
  };

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
            value={searchValue}
          />

          <PostList
            posts={combinedPosts}
            highlightedSearchResult={searchValue}
          />
        </>
      ) : (
        <>
          <h2 className="sub-title">
            {isError ? ('Error occured!!!') : ('No PostsList yet!')}
          </h2>

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
