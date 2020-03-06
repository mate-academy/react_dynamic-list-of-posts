import React, {
  FC, useState, ChangeEvent, useMemo,
} from 'react';
import './App.css';
import { PostList } from './components/PostList';
import { getPreparedPosts } from './api/getData';
import { Search } from './components/Search';
import { LoadButton } from './components/LoadButton';
import { LoaderContainer } from './components/LoaderContainer';
import { filterPosts } from './api/filter';

export const App: FC = () => {
  const [posts, setPosts] = useState<PreparedPostInterface[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleLoad = async () => {
    setIsLoaded(true);
    setIsLoading(true);
    const postsFromServer = await getPreparedPosts();

    setPosts(postsFromServer);
    setIsLoading(false);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const postsToShow = useMemo(() => {
    if (!posts.length) {
      return [];
    }

    return filterPosts(query, posts);
  }, [query, posts]);

  return (
    <>
      {isLoaded && <Search query={query} handleSearch={handleSearch} /> }
      {!isLoaded && <LoadButton handleLoad={handleLoad} />}

      {isLoaded && <PostList posts={postsToShow} />}
      {isLoading && <LoaderContainer />}
    </>
  );
};
