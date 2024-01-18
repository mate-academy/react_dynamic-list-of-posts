import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

interface Props {
  id: number,
  title: string,
  userId: number,
  body: string,
  openPostId?: number,
  onClick: (el: Post) => void,
}

export const PostItem: React.FC<Props> = ({
  id,
  title,
  userId,
  body,
  openPostId,
  onClick,
}) => (
  <tr
    data-cy="Post"
  >
    <td data-cy="PostId">{id}</td>

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
          { 'is-light': openPostId !== id },
        )}
        onClick={() => onClick(({
          id, userId, title, body,
        }))}
      >
        {openPostId === id ? 'Close' : 'Open'}
      </button>
    </td>
  </tr>
);
