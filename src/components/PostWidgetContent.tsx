import React from 'react';
import { Loader } from './Loader';
import ErrorMessage from './ErrorMessage';
import { usePost } from '../hooks/usePost';
import { useUser } from '../hooks/useUser';
// eslint-disable-next-line import/extensions
import { PostList } from './PostList';

const PostWidgetContent:React.FC = () => {
  const { selectedUser } = useUser();
  const { posts, postsLoading, postsLoadingError } = usePost();

  if (!selectedUser) {
    return (
      <p data-cy="NoSelectedUser">
        No user selected
      </p>
    );
  }

  if (postsLoadingError) {
    return (
      <ErrorMessage />
    );
  }

  if (postsLoading) {
    return (
      <Loader />
    );
  }

  return (
    <PostList posts={posts} />
  );
};

export default PostWidgetContent;

// <p data-cy="NoSelectedUser">
//   No user selected
// </p>
//
// <Loader />
//
// <div
//   className="notification is-danger"
//   data-cy="PostsLoadingError"
// >
//   Something went wrong!
// </div>
//
// <div className="notification is-warning" data-cy="NoPostsYet">
//   No posts yet
// </div>
//
// <PostsList />
