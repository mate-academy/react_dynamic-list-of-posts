import {
  FC,
  memo,
  useContext,
  useMemo,
} from 'react';

import { Loader } from '../Loader';
import { PostsList } from './PostsList';
import { PostsContext } from '../PostsContext';
import { UsersContext } from '../UsersContext';

export const MainContent: FC = memo(() => {
  const { selectedUserName } = useContext(UsersContext);
  const {
    userPosts,
    hasError,
    isLoading,
  } = useContext(PostsContext);

  const hasNoSelectedUser = useMemo(
    () => selectedUserName === 'Choose a user',
    [selectedUserName],
  );

  const isNoPosts = useMemo(
    () => userPosts?.length === 0 && !hasNoSelectedUser && !isLoading,
    [userPosts, isLoading],
  );

  const isPosts = useMemo(
    () => userPosts?.length !== 0 && !hasNoSelectedUser && !isLoading,
    [userPosts, isLoading],
  );

  return (
    <div className="block" data-cy="MainContent">
      {hasNoSelectedUser && (
        <p data-cy="NoSelectedUser">
          No user selected
        </p>
      )}

      {isLoading && <Loader />}

      {hasError && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      )}

      {isNoPosts && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}

      {isPosts && <PostsList />}
    </div>
  );
});
