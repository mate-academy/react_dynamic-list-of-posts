import React from 'react';
import { useAppContext } from '../context/AppContext';
import { PostItem } from './PostItem';
import { Loader } from './Loader';

export const PostsList: React.FC = () => {
  const { posts, postsAreLoading, showPostsError } = useAppContext();

  if (postsAreLoading) {
    return <Loader />;
  }

  if (posts !== null && posts.length < 1) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

  if (showPostsError) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {
            posts && posts.length && (posts?.map(post => (
              <PostItem key={post.id} post={post} />
            )))
          }
        </tbody>
      </table>
    </div>
  );
};
