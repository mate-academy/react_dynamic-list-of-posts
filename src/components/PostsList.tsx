import React, { useContext } from 'react';
import { StateContext } from '../utils/Store';
import { PostComponent } from './PostComponent';

export const PostsList: React.FC = () => {
  const state = useContext(StateContext);
  const { userPosts } = state;

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
          {userPosts.map(userPost => (
            <PostComponent key={userPost.id} userPost={userPost} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
