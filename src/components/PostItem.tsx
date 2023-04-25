import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post,
  selectedPost: Post | null,
  onSelectPost: (post: Post | null) => void,
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  onSelectPost,
}) => {
  const isSelected = selectedPost?.id === post.id;

  return (
    <tr
      data-cy="Post"
    >
      <td data-cy="PostId">
        {post.id}
      </td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', { 'is-light': !isSelected })}
          onClick={() => onSelectPost(post)}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
