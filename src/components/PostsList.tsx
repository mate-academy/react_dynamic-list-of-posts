import React, { Dispatch, SetStateAction } from 'react';

import { Post } from '../types';
import { PostItem } from './index';

type Props = {
  posts: Post[] | null;
  selectedPost: Post | null;
  onSelectPost: Dispatch<SetStateAction<Post | null>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onSelectPost,
}) => (
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
        {posts?.map(post => (
          <PostItem
            post={post}
            key={post.id}
            selectedPost={selectedPost}
            onSelectPost={onSelectPost}
          />
        ))}
      </tbody>
    </table>
  </div>
);
