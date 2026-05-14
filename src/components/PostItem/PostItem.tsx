import React from 'react';
import { Post } from '../../types/Post';
import classNames from 'classnames';

type Props = {
  post: Post;
  selectedPost: Post | null;
  onPostSelect: (post: Post | null) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  onPostSelect,
}) => {
  const isSelected = selectedPost?.id === post.id;

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': !isSelected,
          })}
          onClick={() => onPostSelect(isSelected ? null : post)}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
