import React, { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
import { PostItem } from './PostItem';

export const PostsList: React.FC = () => {
  const { filteredPosts, selectedUser } = useContext(PostsContext);

  if (filteredPosts.length === 0 && !selectedUser) {
    return <p data-cy="NoSelectedUser">No user selected</p>;
  }

  if (filteredPosts.length === 0 && selectedUser) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
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
          {filteredPosts.map(post => {
            return <PostItem key={post.id} post={post} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
