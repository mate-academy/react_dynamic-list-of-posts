import React, {
  FC, useState, useMemo, useCallback, ChangeEvent,
} from 'react';
import debounce from 'lodash/debounce';
import { getCorrectPosts } from './utils/api';
import { PostList } from './components/PostList';
import { SearchField } from './components/SearchField';
import 'bootswatch/dist/materia/bootstrap.min.css';

import './App.css';

const App: FC = () => {
  const [posts, setPosts] = useState<CorrectPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [error, setError] = useState('');

  const handleLoad = () => {
    setIsLoading(true);

    getCorrectPosts.then(postsList => {
      setPosts(postsList);
    }).catch(error => setError(error.toString()))
      .finally(() => setIsLoading(false));
  };

  const visiblePosts = useMemo(
    () => posts
      .filter(({ title, body }) => {
        return (
          title.includes(filterQuery.toLocaleLowerCase())
          || body.includes(filterQuery.toLocaleLowerCase())
        );
      }),
    [filterQuery, posts],
  );

  const setFilterQueryWithDebounce = useCallback(
    debounce(setFilterQuery, 2000),
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    setFilterQueryWithDebounce(value);
  };

  return (
    <main className="container">
      <h1 className="text-center title">
        Dynamic list of posts
      </h1>

      {posts.length === 0 && (
        <button
          type="button"
          className="button-load btn btn-secondary"
          onClick={handleLoad}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      )}

      {error && (
        <div className="alert alert-dismissible alert-warning">
          <span>
            {`Server responded
            ${error}
            Check your internet connection and try again.`}
          </span>
        </div>
      )}

      {posts.length !== 0 && (
        <>
          <SearchField
            setValue={handleChange}
            searchingValue={query}
          />
          <PostList posts={visiblePosts} />
        </>
      )}
    </main>
  );
};

export default App;
