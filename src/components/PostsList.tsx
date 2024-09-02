import React, { useContext } from 'react';
import { StateContext } from '../store/store';
import { PostItem } from './PostItem';
{
  /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
}

export const PostsList: React.FC = () => {
  const { posts } = useContext(StateContext);

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

        <tbody>
          {posts?.map(post => <PostItem key={post.id} post={post} />)}
        </tbody>
      </table>
    </div>
  );
};
