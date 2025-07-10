import React from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';

type Props = {
  post: Post;
  selectedPost: Post | null;
  handlePost: (id: number) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  handlePost,
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
          className={cn('button', 'is-link', { 'is-light': !isSelected })}
          onClick={() => handlePost(post.id)}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
