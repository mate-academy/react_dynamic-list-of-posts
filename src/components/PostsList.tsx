import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem/PostItem';

type Props = {
  posts: Post[];
  handleOpenPost: (id: number) => void;
};

export const PostsList: React.FC<Props> = ({ posts, handleOpenPost }) => (
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
          <PostItem
            id={post.id}
            title={post.title}
            handleOpenPost={handleOpenPost}
            key={post.id}
          />
        ))}
      </tbody>
    </table>
  </div>
);
