import React, { useContext } from 'react';
import { Context } from '../context/Context';
import { Loader } from './Loader';
import { PostsList } from './PostsList';

export const Main: React.FC = () => {
  const { selectedUser, errorMessage, isLoading, posts } = useContext(Context);

  return (
    <div className="block" data-cy="MainContent">
      {selectedUser === null && (
        <p data-cy="NoSelectedUser">No user selected</p>
      )}

      {isLoading && selectedUser !== null && <Loader />}

      {errorMessage === 'Something went wrong!' && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          {errorMessage}
        </div>
      )}

      {selectedUser !== null &&
        !isLoading &&
        !errorMessage &&
        (posts.length > 0 ? (
          <PostsList />
        ) : (
          <div className="notification is-warning" data-cy="NoPostsYet">
            No posts yet
          </div>
        ))}
    </div>
  );
};
