import React, { useState, useCallback } from 'react';
import './App.css';

import { getPosts } from './api/api';
import { PostList } from './components/PostList';
import { debounce } from './helpers/debounce';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleSearchField, setvisibleSearchField] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const handleGetPosts = () => {
    setLoading(true);
    setvisibleSearchField(true);
    setTimeout(() => {
      getPosts()
        .then(postsFromServer => setPosts(postsFromServer))
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  };

  const preparePosts = posts.filter(({ title, body }) => (
    (`${title} ${body}`)
      .toLocaleLowerCase()
      .replace(/\s*/g, ' ')
      .includes(filterQuery.toLocaleLowerCase().replace(/\s*/g, ' '))
  ));

  const setFilterQueryWithDebounce = useCallback(
    debounce(setFilterQuery, 500), [],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setQuery(value);
    setFilterQueryWithDebounce(value);
  };

  return (
    <div className="app">
      <h1 className="post__header">Dynamic list of posts</h1>
      {
        visibleSearchField
          ? (
            <div className="post__search-field">
              <label htmlFor="search">
                Filter Posts
                <input
                  type="text"
                  id="search"
                  value={query}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          )
          : <button type="button" className="post__button" onClick={handleGetPosts}>Load Posts</button>
      }
      {
        loading
          ? (
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          )
          : <PostList posts={preparePosts} />
      }
    </div>
  );
};

export default App;
