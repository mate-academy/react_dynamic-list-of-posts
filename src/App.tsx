import React, { useState, useMemo, useCallback } from 'react';
import './App.css';
import debounce from 'lodash/debounce';
import { preparedPostList } from './api';
import { PostList } from './components/PostList';


const App: React.FC = () => {
  const [posts, setPosts] = useState<PostsFromServer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFirstPage, setLoadingFirstPage] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const downLoadPosts = () => {
    setLoading(true);
    setTimeout(() => {
      preparedPostList().then(post => setPosts(post));
      setLoading(false);
      setLoadingFirstPage(true);
    }, 500);
  };

  const visiblePosts = useMemo(() => {
    const filteredPosts = [...posts].filter(post => {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();

      return (title + body).includes(filterQuery.toLowerCase());
    });

    return filteredPosts;
  }, [posts, filterQuery]);

  const setFilterQueryWithDebounce = useCallback(
    debounce(setFilterQuery, 1000), [],
  );


  const handdleSearchPhrase = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setFilterQueryWithDebounce(event.target.value);
  };

  return (
    <>
      <h1>Dynamic list of posts</h1>
      {loadingFirstPage
        ? (
          <div className="control">
            <input
              type="text"
              id="search-query"
              className="form-control mr-sm-2"
              placeholder="Search"
              value={searchQuery}
              onChange={handdleSearchPhrase}
            />
          </div>
        )
        : (
          <button type="button" className="btn btn-primary" onClick={downLoadPosts}>
            {loading ? 'Loading...' : 'Load Todos'}
          </button>
        )}
      <PostList posts={visiblePosts} />
    </>
  );
};

export default App;
