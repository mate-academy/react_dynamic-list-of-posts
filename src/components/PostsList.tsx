import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContetxt';
import { PostInfo } from './PostInfo';

export const PostsList: React.FC = () => {
  const { posts } = useContext(GlobalContext);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        {posts.map(post => (
          <PostInfo post={post} key={post.id} />
        ))}
      </table>
    </div>
  );
};
