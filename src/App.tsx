import React, { FC, useState, useMemo, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { getPosts, getUsers, getComments } from './api/api';
import { PostList } from './components/PostList/PostList';
import './App.css';

const App: FC = () => {
  const [posts, setPosts] = useState<PostWithComments[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isStarted, setStarted] = useState(true);
  const [query, setQuery] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const loadData = () => {
    setLoading(true);

    Promise.all([getPosts(), getUsers(), getComments()])
      .then(([postsFromApi, usersFromApi, commentsFromApi]) => {
        const preparedPosts = postsFromApi.map(post => ({
          ...post,
          user: usersFromApi.find(person => post.userId === person.id) as User,
          comments: commentsFromApi.filter(comment => post.id === comment.postId) as Comments,
        }));

        setPosts(preparedPosts);
        setLoading(false);
        setStarted(false);
      });
  };

  const setFilterQueryWithDebounce = useCallback(debounce(setFilterQuery, 1000), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    setFilterQueryWithDebounce(value);
  };

  const filtered = useMemo<PostWithComments[]>(() => {
    return posts.filter(post => (
      post.title.includes(filterQuery) || post.body.includes(filterQuery)
    ));
  }, [filterQuery, posts]);

  return (
    <>
      {isStarted
        ? (
          <button
            type="button"
            className="button button-load"
            disabled={isLoading}
            onClick={loadData}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        ) : (
          <div className="App">
            <label htmlFor="search-query" className="label">
              Search
              <div className="control">
                <input
                  type="text"
                  id="search-query"
                  value={query}
                  className="input"
                  placeholder="Title and body search"
                  onChange={(event) => handleChange(event)}
                />
              </div>
            </label>
            <PostList postlist={query ? filtered : posts} />
          </div>
        )}
    </>
  );
};

export default App;
