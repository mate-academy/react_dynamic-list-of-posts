import React, { useContext } from 'react';

import { StateContext } from '../../Store';

import { Loader } from '../Loader';
import { PostsList } from '../PostsList';

export const MainContent: React.FC = () => {
  const {
    selectedUser,
    posts,
    isLoadingPosts,
    error,
  } = useContext(StateContext);

  /* eslint-disable max-len */
  const hasNoPosts = !!selectedUser && !posts.length && !isLoadingPosts && !error;
  const hasPosts = !!selectedUser && !!posts.length && !isLoadingPosts && !error;

  return (
    <div className="block" data-cy="MainContent">
      {!selectedUser && (
        <p data-cy="NoSelectedUser">
          No user selected
        </p>
      )}

      {hasNoPosts && (
        <div data-cy="NoPostsYet" className="notification is-warning">
          No posts yet
        </div>
      )}

      {!isLoadingPosts && error && (
        <div
          data-cy="PostsLoadingError"
          className="notification is-danger"
        >
          {error}
        </div>
      )}

      {isLoadingPosts && (
        <Loader />
      )}

      {hasPosts && (
        <PostsList />
      )}
    </div>
  );
};
