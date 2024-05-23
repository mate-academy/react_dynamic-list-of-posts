import React, { useContext } from 'react';
import { StateContext } from '../context/GlobalPostsProvider';
import { Post } from './Post';

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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts?.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
