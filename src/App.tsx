import React, {
  FC, useState, useMemo, ChangeEvent, useCallback,
} from 'react';
import debounce from 'lodash/debounce';
import './App.css';

import { getComments, getUsers, getPosts } from './util';
import { PostList } from './components/PostList/PostList';



const App: FC = () => {
  const [posts, setPosts] = useState<PostWithComments[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');


  function filterPosts(initialPosts: PostWithComments[], filter: string): PostWithComments[] {
    const pattern = new RegExp(filter.trim(), 'gi');

    return initialPosts.filter(post => {
      return pattern.test(post.title) || pattern.test(post.body);
    });
  }

  const visiblePosts = useMemo(
    () => filterPosts(posts, filterQuery),
    [filterQuery, posts],
  );

  const setFilterQueryWithDebonce = useCallback(
    debounce(setFilterQuery, 1000),
    [],
  );

  function loadClickHandler() {
    setIsError(false);
    setIsLoading(true);
    Promise.all([
      getUsers(),
      getPosts(),
      getComments(),
    ]).then(([usersFromApi, postsFromApi, commentsFromApi]) => {
      setIsLoading(false);
      const newPosts = postsFromApi.map(post => {
        return {
          ...post,
          user: (usersFromApi.find(item => item.id === post.userId) as User),
          comments: commentsFromApi.filter(item => item.postId === post.id),
        };
      });

      setPosts(newPosts);
    }).catch(() => {
      setIsError(true);
      setIsLoading(false);
    });
  }

  function searchHandler(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setFilterQueryWithDebonce(event.target.value);
  }

  if (!posts.length) {
    return (
      <>
        <h1>Dynamic list of posts</h1>
        <button
          type="button"
          onClick={loadClickHandler}
          disabled={isLoading}
        >
          Load posts
        </button>
        <p>{isLoading ? 'Loading' : ''}</p>
        <p>{isError ? 'Error occured. Try again later' : ''}</p>
      </>
    );
  }

  return (
    <>
      <h1>Dynamic list of posts</h1>
      <input
        className="search-field"
        value={query}
        type="text"
        placeholder="Enter search query"
        onChange={searchHandler}
      />
      <div className="App">
        <PostList postList={visiblePosts} />
      </div>
    </>
  );
};

export default App;
