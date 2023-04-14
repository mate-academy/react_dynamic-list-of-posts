import React from 'react';
import classNames from 'classnames';
import { Post } from '../../types/Post';

type Props = {
  post: Post;
  isSelected: boolean;
  onPostSelection: (newPostId: number) => void;
};

export const PostItem: React.FC<Props> = ({
  post: {
    id,
    title,
  },
  isSelected,
  onPostSelection,
}) => {
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
          className={classNames(
            'button',
            'is-link',
            {
              'is-light': !isSelected,
            },
          )}
          onClick={() => onPostSelection(id)}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
