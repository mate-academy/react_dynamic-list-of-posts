import {
  FC, useContext, useMemo,
} from 'react';
import { Loader } from '../Loader';
import { PostsList } from './PostsList/PostsList';
import { PostsContext } from './PostsProvider';
import { UsersContext } from '../UsersProvider';
import { NoPostMessage } from './NoPostMessage';
import { PostsError } from './PostsError';

export const MainContent: FC = () => {
  const { selectedUserName } = useContext(UsersContext);
  const { isError, userPosts, isLoading } = useContext(PostsContext);
  const isUserSelected = useMemo(
    () => selectedUserName === 'Choose a user', [selectedUserName],
  );
  const isNoPosts = useMemo(
    () => userPosts?.length === 0 && !isUserSelected && !isLoading,
    [userPosts, isLoading],
  );
  const isPosts = useMemo(
    () => userPosts?.length !== 0 && !isUserSelected && !isLoading,
    [userPosts, isLoading],
  );

  return (
    <div className="block" data-cy="MainContent">
      {isUserSelected && (
        <p data-cy="NoSelectedUser">
          No user selected
        </p>
      )}

      {isLoading && <Loader />}

      {isError && <PostsError />}

      {isNoPosts && <NoPostMessage />}

      {isPosts && <PostsList />}
    </div>
  );
};
