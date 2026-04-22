import React, { useCallback, useState } from 'react';

import { UserSelector } from './UserSelector';
import { Loader } from './Loader';
import { PostsList } from './PostsList';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { getPostsByUserId } from '../api/posts';
import { useError } from '../hooks/useError';

type Props = {
  onOpenPostDetails: (post: Post) => void;
  onClosePostDetails: () => void;
  activePost: Post | null;
};

const MainBase: React.FC<Props> = ({
  onOpenPostDetails,
  onClosePostDetails,
  activePost,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserPosts, setSelectedUserPosts] = useState<Post[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const { error, clearErrorMessage, setErrorMessage } = useError();

  const selectUser = useCallback(
    (user: User) => {
      onClosePostDetails();
      setSelectedUser(user);
      setSelectedUserPosts([]);
      clearErrorMessage();
      setIsLoading(true);

      getPostsByUserId(user.id)
        .then(setSelectedUserPosts)
        .catch(() => {
          setErrorMessage('Cannot load posts.');
        })
        .finally(() => setIsLoading(false));
    },
    [setErrorMessage, clearErrorMessage, onClosePostDetails],
  );

  const setUserSelectorError = useCallback(() => {
    setErrorMessage('Cannot load users.');
  }, [setErrorMessage]);

  const isNoPostsWarning =
    !error.id && !isLoading && selectedUser && selectedUserPosts.length === 0;

  return (
    <div className="tile is-parent">
      <div className="tile is-child box is-success">
        <div className="block">
          <UserSelector
            onUserSelected={selectUser}
            selectedUser={selectedUser}
            onError={setUserSelectorError}
          />
        </div>

        <div className="block" data-cy="MainContent">
          {!selectedUser && !error.id && (
            <p data-cy="NoSelectedUser">No user selected</p>
          )}

          {isLoading && <Loader />}

          {error.id && !isLoading && (
            <div className="notification is-danger" data-cy="PostsLoadingError">
              {error.message}
            </div>
          )}

          {isNoPostsWarning && (
            <div className="notification is-warning" data-cy="NoPostsYet">
              No posts yet
            </div>
          )}

          {selectedUser && selectedUserPosts.length !== 0 && (
            <PostsList
              onClosePostDetails={onClosePostDetails}
              posts={selectedUserPosts}
              onOpenPostDetails={onOpenPostDetails}
              activePost={activePost}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const Main = React.memo(MainBase);
