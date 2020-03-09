import React, {
  FC,
  useState,
  ChangeEvent,
  useMemo,
  useCallback,
} from 'react';

import debounce from 'lodash.debounce';

import './App.css';
import { getCompletePosts } from './api/Api';
import { PostList } from './components/PostList/PostList';


export const App: FC = () => {
  const [posts, setPosts] = useState<CompletePostInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');


  const loadPosts = async () => {
    setIsLoading(true);
    const postFromServer = await getCompletePosts();

    setPosts(postFromServer);
  };

  const setFilterQueryWithDebounce = useCallback(
    debounce(setFilterQuery, 1000),
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setFilterQueryWithDebounce(event.target.value);
  };

  const postsToShow = useMemo(() => {
    return posts
      .filter(post => post.body.toLowerCase().includes(filterQuery.toLowerCase())
      || post.title.toLowerCase().includes(filterQuery.toLowerCase()));
  }, [filterQuery, posts]);

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>

      {!posts.length
        ? (
          <button type="button" onClick={loadPosts} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load Posts'}
          </button>
        ) : (
          <>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Input text"
            />
            <PostList allPosts={postsToShow} />
          </>
        )}
    </div>
  );
};
