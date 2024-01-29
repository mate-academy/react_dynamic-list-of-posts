import React, { useContext } from 'react';
import { StateContext } from '../../store/store';
import { PostItem } from '../PostItem/PostItem';

export const PostsList: React.FC = () => {
  const { userPosts } = useContext(StateContext);

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
          {userPosts.map(post => (
            <PostItem post={post} key={post.id} />
          ))}

        </tbody>
      </table>
    </div>
  );
};
