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

import { loadPosts } from './utils/posts';
import { loadUsers } from './utils/users';
import { loadComments } from './utils/comments';
import { getVisiblePosts } from './utils/helpers';
import { FullPost, User } from './constants/types';
import './App.css';

const DEBOUNCE_DELAY = 1000;


export const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataWasLoaded, setDataWasLoaded] = useState<boolean>(false);
  const [hasLoadError, setHasLoadError] = useState<boolean>(false);
  const [posts, setPosts] = useState<FullPost[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const handleLoadButtonClick = async () => {
    setIsLoading(true);
    setHasLoadError(false);

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
            user: initialUsers.find(user => user.id === post.userId) as User,
            comments: initialComments.filter(
              comment => comment.postId === post.id,
            ),
          };
        }),
      );

      setDataWasLoaded(true);
    } catch (error) {
      setHasLoadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoadButton = (): JSX.Element | null => {
    if (dataWasLoaded) {
      return null;
    }

    if (isLoading) {
      return <Button text="Loading" disabled />;
    }

    if (hasLoadError) {
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
      {hasLoadError ? 'There was an error during data loading' : null}
      {renderLoadButton()}
      {dataWasLoaded ? (
        <div>
          <SearchBar value={inputValue} onChange={handleInputChange} />
          <PostsList posts={visiblePosts} />
        </div>
      ) : null}
    </div>
  );
};
