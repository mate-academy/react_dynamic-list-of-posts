import React from 'react';
import { Post } from '../types/Post';
import { PostComponent } from './postComponent';

interface PostsListProps {
  usersPosts: Post[];
}

export const PostsList: React.FC<PostsListProps> = ({ usersPosts }) => {
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
          {usersPosts.map(post => (
            <PostComponent key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
