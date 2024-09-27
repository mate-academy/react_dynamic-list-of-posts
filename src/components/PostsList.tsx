import React, { memo, useCallback } from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[];
  selectedPostId: number | null;
  onPostSelect: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = memo(function PostsList({
  posts,
  selectedPostId,
  onPostSelect,
}) {
  const handleSelect = useCallback(
    (post: Post) => {
      if (post.id === selectedPostId) {
        onPostSelect(null);
      } else {
        onPostSelect(post);
      }
    },
    [selectedPostId, onPostSelect],
  );

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
          {posts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              selectedPostId={selectedPostId}
              onSelect={handleSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});
