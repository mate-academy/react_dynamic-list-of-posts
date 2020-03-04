import React, {
  FC, useState, useMemo, ChangeEvent, useCallback,
} from 'react';
import debounce from 'lodash/debounce';
import './App.css';

import { dataDownload } from './util';
import { PostList } from './components/PostList/PostList';

const URL_POSTS = 'posts';
const URL_USERS = 'users';
const URL_COMMENTS = 'comments';
const URL_START = 'https://jsonplaceholder.typicode.com/';

const App: FC<{}> = () => {
  const [posts, setPosts] = useState<PostWithComments[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');


  function filterPosts(initialPosts: PostWithComments[], filter: string): PostWithComments[] {
    const pattern = new RegExp(filter, 'gi');

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
      dataDownload<User[]>(URL_START + URL_USERS),
      dataDownload<Post[]>(URL_START + URL_POSTS),
      dataDownload<Comment[]>(URL_START + URL_COMMENTS),
    ]).then(response => {
      setIsLoading(false);
      const newPosts = response[1].map(post => {
        return {
          ...post,
          user: (response[0].find(item => item.id === post.userId) as User),
          comments: response[2].filter(item => item.postId === post.id),
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
        placeholder="Enter title or body"
        onChange={searchHandler}
      />
      <div className="App">
        <PostList postList={visiblePosts} />
      </div>
    </>
  );
};

export default App;
