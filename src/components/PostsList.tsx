import React, { useContext } from 'react';
import { StateContext } from '../Store';
import { PostItem } from './PostItem';

export const PostsList: React.FC = () => {
  const { posts, selectedPost } = useContext(StateContext);

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
          {posts.map(post => (
            <PostItem key={post.id} post={post} selectedId={selectedPost?.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
