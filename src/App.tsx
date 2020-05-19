import React, {
  FC, useState, useMemo, ChangeEvent, useCallback,
} from 'react';
import debounce from 'lodash/debounce';

import { getComments, getUsers, getPosts } from './api-service';
import { PostList } from './components/Posts/PostList';

import './App.css';


const App: FC = () => {
  const [posts, setPosts] = useState<PostWithComments[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');


  const filterPosts = (initialPosts: PostWithComments[], filter: string): PostWithComments[] => {
    const pattern = new RegExp(filter.trim(), 'gi');

    return initialPosts.filter(({ title, body }) => pattern.test(title) || pattern.test(body));
  };

  const visiblePosts = useMemo(
    () => filterPosts(posts, filterQuery),
    [filterQuery, posts],
  );

  const setFilterQueryWithDebonce = useCallback(
    debounce(setFilterQuery, 1000),
    [],
  );

  const handleLoadClick = () => {
    setLoading(true);
    Promise.all([
      getUsers(),
      getPosts(),
      getComments(),
    ]).then(([usersFromApi, postsFromApi, commentsFromApi]) => {
      setLoading(false);
      const newPosts = postsFromApi.map(post => {
        return {
          ...post,
          user: (usersFromApi.find(item => item.id === post.userId) as User),
          comments: commentsFromApi.filter(item => item.postId === post.id),
        };
      });

      setPosts(newPosts);
    }).catch(() => {
      setLoading(false);
    });
  };


  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setFilterQueryWithDebonce(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="title has-text-centered">Dynamic list of posts</h1>
      {!posts.length
        ? (
          <>
            <button
              type="button"
              className="button is-info"
              onClick={handleLoadClick}
              disabled={isLoading}
            >
              Load
            </button>
            {isLoading && <p className="text">Loading...</p>}
          </>
        ) : (
          <>
            <input
              type="text"
              className="input is-success mb2"
              value={query}
              placeholder="Search..."
              onChange={searchHandler}
            />
            <PostList postList={visiblePosts} />
          </>
        )}
    </div>
  );
};

export default App;
