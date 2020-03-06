import React, { FC, useState, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { getCorrectPosts } from './utils/api';
import { PostList } from './components/PostList';
import { SearchField } from './components/SearchField';
import 'bootswatch/dist/materia/bootstrap.min.css';

import './App.css';

const App: FC = () => {
  const [posts, setPosts] = useState<CorrectPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchingValue, setSearchValue] = useState('');

  const handleLoad = () => {
    setIsLoading(true);

    getCorrectPosts.then(postsList => {
      setPosts(postsList);
      setIsLoading(false);
    });
  };

  const visiblePosts = useMemo(
    () => posts
      .filter(({ title, body }) => {
        return (
          title.includes(searchingValue.toLocaleLowerCase())
          || body.includes(searchingValue.toLocaleLowerCase())
        );
      }),
    [searchingValue, posts],
  );

  const handleSetValue = debounce((value) => {
    setSearchValue(value.toLocaleLowerCase());
  }, 1000);

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

      {posts.length !== 0 && (
        <>
          <SearchField
            setValue={(e) => handleSetValue(e.target.value)}
            searchingValue={searchingValue}
          />
          <PostList posts={visiblePosts} />
        </>
      )}
    </main>
  );
};

export default App;
