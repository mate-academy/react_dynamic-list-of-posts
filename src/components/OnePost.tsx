import React from 'react';
import cn from 'classnames';

import { Post } from '../types/Post';

type Props = {
  post: Post;
  activePostId: number | null;
  setActivePostId: (param: number | null) => void;
};

export const OnePost: React.FC<Props> = ({
  post,
  activePostId,
  setActivePostId,
}) => {
  const handleOpenPost = (currentPostId: number | null) => {
    if (activePostId === currentPostId) {
      setActivePostId(null);
    } else {
      setActivePostId(currentPostId);
    }
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', {
            'is-light': activePostId !== post.id,
          })}
          onClick={() => handleOpenPost(post.id)}
        >
          {activePostId === post.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
