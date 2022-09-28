import React from 'react';
import { UserSelector } from '../UserSelector';
import { ErrorNotification } from '../ErrorNotification';
import { PostsList } from '../PostsList';
import { Loader } from '../Loader';
import { Post } from '../../types/Post';
import { Error } from '../../types/Error';

type Props = {
  posts: Post[];
  postId: number | null;
  selectedUserId: number | null;
  error: Error | null;
  isLoading: boolean;
  onPost: (id: number | null) => void;
  onSelectUser: (userId: number) => void;
  onError: (error: Error | null) => void;
};

export const Content: React.FC<Props> = ({
  posts,
  postId,
  selectedUserId,
  error,
  isLoading,
  onPost,
  onSelectUser,
  onError,
}) => (
  <div className="tile is-parent">
    <div
      className="
        tile
        is-child
        box
        is-success"
    >

      <UserSelector
        selectedUserId={selectedUserId}
        onSelectUser={onSelectUser}
        onError={onError}
      />

      <div className="block" data-cy="MainContent">
        {!selectedUserId
          && !error
          && (
            <p data-cy="NoSelectedUser">
              No user selected
            </p>
          )}

        {error && (
          <ErrorNotification
            error={error}
            posts={posts}
            selectedUser={selectedUserId}
            element="MainError"
          />
        )}

        {isLoading
          && <Loader />}

        {!isLoading
          && posts.length > 0
          && !error
          && (
            <PostsList
              posts={posts}
              postId={postId}
              onPost={onPost}
            />
          )}
      </div>
    </div>
  </div>
);
