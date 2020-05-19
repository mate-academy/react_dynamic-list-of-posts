import React, {
  useState, ChangeEvent, useCallback, useMemo,
} from 'react';
import { getPreparedPosts } from './helpers/api';
import { debounce } from './helpers/debounce';
import './App.css';
import Loading from './components/Loading/Loading';
import PostList from './components/PostList/PostList';
import Button from './components/Button/Button';

const App = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [posts, setPosts] = useState<PreparedPost[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadPosts = () => {
    setIsToggle(!isToggle);
    getPreparedPosts()
      .then((postsFromServer: PreparedPost[]) => {
        setPosts(postsFromServer);
        setIsLoaded(true);
      })
      .catch(() => (
        setErrorMessage('Oops! Something went wrong... :(')
      ));
  };

  const setFilterQueryWithDebounce = useCallback(
    debounce(setFilterQuery, 500), [],
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery(value);
    setFilterQueryWithDebounce(value);
  };

  const visiblePosts = useMemo(
    () => posts.filter(({ title, body }) => (
      (title + body).toLowerCase().includes(filterQuery.toLowerCase())
    )),
    [filterQuery, posts],
  );

  return (
    <div className="container-header">
      <h1>Dynamic list of posts</h1>

      {(!isToggle && !errorMessage)
        ? (
          <Button
            handleOnClick={loadPosts}
            text="Load"
          />
        )
        : (
          <Loading
            isLoaded={isLoaded}
            errorMessage={errorMessage}
          />
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
      {errorMessage
      && (
        <div className="is-error">
          <p className="is-error__text">
            {errorMessage}
          </p>
          <Button
            handleOnClick={loadPosts}
            text="Try again"
          />
        </div>
      )}
    </div>
  );
};

export default App;
