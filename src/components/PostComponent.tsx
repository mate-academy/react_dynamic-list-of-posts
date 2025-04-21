import React, { useCallback } from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';

interface Props {
  post: Post;
  selectedPost: Post | null;
  onSelectedPost: (value: Post | null) => void;
}

export const PostComponent: React.FC<Props> = React.memo(
  ({ post, onSelectedPost, selectedPost }) => {
    const { id, title } = post;

    const handleSelectPost = useCallback(() => {
      if (selectedPost?.id === post.id) {
        onSelectedPost(null);
      } else {
        onSelectedPost(post);
      }
    }, [onSelectedPost, post, selectedPost]);

    return (
      <tr data-cy="Post">
        <td data-cy="PostId">{id}</td>

        <td data-cy="PostTitle">{title}</td>

        <td className="has-text-right is-vcentered">
          <button
            type="button"
            data-cy="PostButton"
            className={cn('button is-link', {
              'is-light': selectedPost?.id !== post.id,
            })}
            onClick={handleSelectPost}
          >
            {(selectedPost?.id === post.id && 'Close') || 'Open'}
          </button>
        </td>
      </tr>
    );
  },
);

PostComponent.displayName = 'PostComponent';
