import React from 'react';
import { PostsList } from './PostsList';
import { Loader } from './Loader';
import { usePostInfo } from '../utils/PostContext';

export const Main: React.FC = () => {
  const { posts, selectedUser, isPostLoading, postsLoadingError } =
    usePostInfo();

  return (
    <div className="block" data-cy="MainContent">
      {!selectedUser && <p data-cy="NoSelectedUser">No user selected</p>}

      {isPostLoading && <Loader />}

      {selectedUser && (
        <>
          {postsLoadingError && (
            <div className="notification is-danger" data-cy="PostsLoadingError">
              Something went wrong!
            </div>
          )}

          {!postsLoadingError && !posts.length && !isPostLoading && (
            <div className="notification is-warning" data-cy="NoPostsYet">
              No posts yet
            </div>
          )}
          {!isPostLoading && !postsLoadingError && !!posts.length && <PostsList />}
        </>
      )}
    </div>
  );
};
