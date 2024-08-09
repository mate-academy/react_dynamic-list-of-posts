import React from 'react';
import { useValues } from '../SharedContext';
import { PostsListItem } from './PostsListItem';

export const PostsList: React.FC = () => {
  const { posts } = useValues();

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
          {posts?.map(post => <PostsListItem key={post.id} post={post} />)}
        </tbody>
      </table>
    </div>
  );
};
