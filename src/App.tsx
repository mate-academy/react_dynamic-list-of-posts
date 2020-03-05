import React, {
  FC,
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
} from 'react';
import debounce from 'lodash/debounce';

import { Button } from './components/Button';
import { PostsList } from './components/PostsList';
import { SearchBar } from './components/SearchBar';

import { loadPosts, loadUsers, loadComments } from './utils/api';
import { getVisiblePosts } from './utils/helpers';
import { FullPost, User } from './constants/types';
import { DEBOUNCE_DELAY } from './constants/general';
import './App.css';


export const App: FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadError, setLoadError] = useState(false);
  const [posts, setPosts] = useState<FullPost[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const handleLoadButtonClick = async () => {
    setLoading(true);
    setLoadError(false);

    try {
      const [initialPosts, initialUsers, initialComments] = await Promise.all([
        loadPosts(),
        loadUsers(),
        loadComments(),
      ]);

      setPosts(
        initialPosts.map(post => {
          return {
            ...post,
            user: initialUsers.find(
              user => user.id === post.userId,
            ) as User,
            comments: initialComments.filter(
              comment => comment.postId === post.id,
            ),
          };
        }),
      );

      setLoaded(true);
    } catch (error) {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  const renderLoadButton = (): JSX.Element | null => {
    if (isLoaded) {
      return null;
    }

    if (isLoading) {
      return <Button text="Loading" disabled />;
    }

    if (isLoadError) {
      return <Button text="Try again" onClick={handleLoadButtonClick} />;
    }

    return <Button text="Load" onClick={handleLoadButtonClick} />;
  };

  const setFilterQueryWithDebounce = useCallback(
    debounce(setFilterQuery, DEBOUNCE_DELAY),
    [],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setFilterQueryWithDebounce(event.target.value);
  };

  const visiblePosts = useMemo(
    () => getVisiblePosts(posts, filterQuery),
    [filterQuery, posts],
  );

  return (
    <div>
      <p>
        {isLoadError && 'There was an error during data loading'}
      </p>
      {renderLoadButton()}
      {isLoaded && (
        <div>
          <SearchBar value={inputValue} onChange={handleInputChange} />
          <PostsList posts={visiblePosts} />
        </div>
      )}
    </div>
  );
};
