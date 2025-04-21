import React from 'react';
import { Post } from '../types/Post';
import { PostComponent } from './PostComponent';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  onSelectedPost: (value: Post | null) => void;
}

export const PostsList: React.FC<Props> = React.memo(
  ({ posts, selectedPost, onSelectedPost }) => (
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
            <PostComponent
              post={post}
              key={post.id}
              selectedPost={selectedPost}
              onSelectedPost={onSelectedPost}
            />
          ))}
        </tbody>
      </table>
    </div>
  ),
);

PostsList.displayName = 'PostsList';
