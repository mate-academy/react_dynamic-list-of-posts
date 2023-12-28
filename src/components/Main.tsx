import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PostsList } from './PostsList';
import { UsersContext } from '../store/UsersContext';
import { getUserPosts } from '../api/posts';
import { PostsContext } from '../store/PostsContext';
import { ErrorType } from '../types/ErrorType';

export const Main: React.FC = () => {
  const { selectedUser } = useContext(UsersContext);
  const { posts, setPosts } = useContext(PostsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setErrorMessage('');
      setIsLoading(true);

      getUserPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => setErrorMessage(ErrorType.loadPosts))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser?.id]);

  return (
    <div className="block" data-cy="MainContent">
      {!selectedUser
        ? (
          <p data-cy="NoSelectedUser">
            No user selected
          </p>
        )
        : (
          <>
            {isLoading && <Loader />}

            {errorMessage && (
              <div
                className="notification is-danger"
                data-cy="PostsLoadingError"
              >
                {errorMessage}
              </div>
            )}

            {!errorMessage && !isLoading && posts.length === 0 && (
              <div className="notification is-warning" data-cy="NoPostsYet">
                No posts yet
              </div>
            )}

            {!isLoading && !errorMessage && posts.length > 0 && <PostsList />}
          </>
        )}
    </div>
  );
};
