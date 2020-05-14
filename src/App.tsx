import React, { FC, useState } from 'react';
import './App.scss';
import { Post } from './components/interfaces';
import { preparedDatas } from './components/getPosts';
import { DownloadButton } from './components/DownloadButton';
import { PostsList } from './components/PostsList';
import { debounce } from './helper/customDebounce';

const App: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [downloadError, setError] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  let visiblePosts: Post[];

  const loadData = () => {
    setLoading(true);
    preparedDatas()
      .then(data => {
        setPosts(data);
        setIsLoaded(true);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  const startSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    debouncedSearch(value);
  };

  const filterPosts = (value: string) => {
    if (!value) {
      return posts;
    }

    return posts
      .filter((post: Post) => (post.title + post.body)
        .replace(/\s*/g, ' ')
        .includes(value
          .replace(/\s*/g, ' ')));
  };

  const debouncedSearch = debounce((searchQuery: string) => setSearchValue(searchQuery), 1000);

  visiblePosts = filterPosts(searchValue);

  return (
    <>
      <h1 className="title">Posts</h1>
      {!isLoaded
        && <DownloadButton isLoading={loading} dataGeneration={loadData} />}
      {downloadError && (
        <p className="error">Loading error, please, try again.</p>
      )}
      {isLoaded && (
        <>
          <div className="inputContainer">
            <input
              type="text"
              className="input"
              placeholder="write a text for search"
              onChange={startSearch}
            />
          </div>
          <PostsList posts={visiblePosts} />
        </>
      )}
    </>
  );
};

export default App;
