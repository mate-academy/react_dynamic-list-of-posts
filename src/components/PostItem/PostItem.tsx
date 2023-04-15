import React from 'react';
import classNames from 'classnames';
import { Post } from '../../types/Post';

type Props = {
  post: Post;
  isSelected: boolean;
  onSelect: (post: Post | null) => void;
};

export const PostItem: React.FC<Props> = React.memo(({
  post,
  isSelected,
  onSelect,
}) => {
  const {
    id,
    title,
  } = post;

  const handlePostSelect = () => onSelect(isSelected ? null : post);

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
          onClick={handlePostSelect}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
});
