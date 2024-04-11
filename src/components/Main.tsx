import React from 'react';
import { PostsList } from './PostsList';
import { Loader } from './Loader';
import { usePostInfo } from '../utils/PostContext';

export const Main: React.FC = () => {
  const { selectedUser, posts, isPostLoading, errPostLoading } = usePostInfo();

  return (
    <div className="block" data-cy="MainContent">
      {!selectedUser && <p data-cy="NoSelectedUser">No user selected</p>}

      {isPostLoading && <Loader />}

      {selectedUser && (
        <>
          {errPostLoading && (
            <div className="notification is-danger" data-cy="PostsLoadingError">
              Something went wrong!
            </div>
          )}

          {!errPostLoading && !posts.length && !isPostLoading && (
            <div className="notification is-warning" data-cy="NoPostsYet">
              No posts yet
            </div>
          )}
          {!errPostLoading && !!posts.length && <PostsList />}
        </>
      )}
    </div>
  );
};
