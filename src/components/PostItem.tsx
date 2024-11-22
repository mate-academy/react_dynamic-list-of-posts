import cn from 'classnames';
import React, { memo } from 'react';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  selectedPostId: number | null;
  onSelect: (post: Post) => void;
};

export const PostItem: React.FC<Props> = memo(function PostItem({
  post,
  selectedPostId,
  onSelect,
}) {
  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', {
            'is-light': post.id !== selectedPostId,
          })}
          onClick={() => onSelect(post)}
        >
          {post.id === selectedPostId ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
});
