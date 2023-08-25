import React from 'react';
import cn from 'classnames';
import { Post } from '../../types/Post';

type Props = {
  post: Post;
  handlerOpenComments: (post: Post) => void;
  openedPostId: number;
};

export const PostItem: React.FC<Props> = ({
  post,
  handlerOpenComments,
  openedPostId,
}) => {
  const { id, title } = post;

  return (
    <tr data-cy="Post">
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
            { 'is-light': openedPostId !== id },
          )}
          onClick={() => handlerOpenComments(post)}
        >
          {openedPostId === id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
