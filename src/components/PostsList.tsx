import React, { useContext } from 'react';
import { UsersContext } from '../contexts/UsersProvider';
import { PostInfo } from './PostInfo';

export const PostsList: React.FC = () => {
  const { userPosts } = useContext(UsersContext);

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
            <PostInfo
              key={post.id}
              post={post}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
