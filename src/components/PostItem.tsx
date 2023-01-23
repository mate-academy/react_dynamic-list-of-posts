import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  selectedPostId: number;
  onSelectPostId: (postId: number) => void;
};

export const PostItem: React.FC<Props> = React.memo(
  ({
    post,
    selectedPostId,
    onSelectPostId,
  }) => {
    const {
      id,
      title,
    } = post;

    const handleClickPostButton = () => {
      onSelectPostId(id);
    };

    return (
      <tr data-cy="Post">
        <td data-cy="PostId">
          {id}
        </td>

        <td data-cy="PostTitle">
          {title}
        </td>

        <td className="has-text-right is-vcentered">
          <button
            type="button"
            data-cy="PostButton"
            className={cn(
              'button',
              'is-link',
              { 'is-light': selectedPostId !== id },
            )}
            onClick={handleClickPostButton}
          >
            {selectedPostId === id ? 'Close' : 'Open'}
          </button>
        </td>
      </tr>
    );
  },
);
