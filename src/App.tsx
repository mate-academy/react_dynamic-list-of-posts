import React, { useState, ChangeEvent, useCallback } from 'react';
import { getPreparedPosts } from './helpers/api';
import { debounce } from './helpers/debounce';
import './App.css';
import Loading from './components/Loading/Loading';
import PostList from './components/PostList/PostList';

const App = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [posts, setPosts] = useState<PreparedPost[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const loadPosts = () => {
    setIsToggle(!isToggle);
    getPreparedPosts()
      .then((postsFromServer: PreparedPost[]) => {
        setPosts(postsFromServer);
        setIsLoaded(true);
      });
  };

  const setFilterQueryWithDebounce = useCallback(
    debounce(setFilterQuery, 500), [],
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery(value);
    setFilterQueryWithDebounce(value);
  };

  const visiblePosts = posts.filter(({ title, body }) => (
    (title + body).toLowerCase().includes(filterQuery.toLowerCase())
  ));

  return (
    <div className="container-header">
      <h1>Dynamic list of posts</h1>

      {!isToggle
        ? (
          <button
            type="button"
            className="button"
            onClick={loadPosts}
          >
            Load
          </button>
        )
        : (
          <Loading isLoaded={isLoaded} />
        )}

      {isLoaded
        && (
          <>
            <label
              htmlFor="inputFilter"
              className="label"
            >
              Filter field
              <input
                type="text"
                id="inputFilter"
                className="inputFilter"
                value={query}
                onChange={handleOnChange}
              />
            </label>

            <PostList posts={visiblePosts} />
          </>
        )}
    </div>
  );
};

export default App;
