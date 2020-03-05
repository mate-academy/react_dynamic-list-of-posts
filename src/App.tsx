import React, { FC, useMemo, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { getPostsWithUserAndComments, searchCallback } from './utils/api';
import { PostsWithUserAndComments } from './constants/types';
import { PostList } from './components/PostList/PostList';

export const App: FC = () => {
  const [posts, setPosts] = useState<PostsWithUserAndComments[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const handleStart = async () => {
    try {
      setIsLoaded(true);
      const filteredPosts = await getPostsWithUserAndComments();

      setPosts(filteredPosts);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setIsLoaded(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setQuery(target.value.toLowerCase());
  };

  const searchedPosts = useMemo(() => posts.filter(searchCallback(query)), [posts, query]);

  return (
    <div className="app">
      {!posts.length
        ? (
          <>
            <h1>Dynamic list of posts</h1>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleStart}
            >
              {isLoaded ? 'Loading.......' : 'Start load'}
            </button>
          </>
        )
        : (
          <>
            <input
              type="text"
              id="input"
              className="form-control"
              placeholder="type search"
              onChange={handleSearch}
            />
            <PostList posts={query ? searchedPosts : posts} />
          </>
        )}
    </div>
  );
};
