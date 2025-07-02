import React from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';

type ErrorProps = {
  usersError: boolean;
  userPosts: Post[] | null;
  selectedUser: User | null;
};

export const ErrorNotification: React.FC<ErrorProps> = ({
  usersError,
  userPosts,
  selectedUser,
}) => {
  return (
    <>
      {usersError && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      )}

      {selectedUser && userPosts && userPosts.length === 0 && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}
    </>
  );
};
