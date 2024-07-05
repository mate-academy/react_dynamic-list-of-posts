import React from 'react';
import { Post } from '../types/Post';
import { HandlePostSelect } from '../types/handlers';
import classNames from 'classnames';

type Props = {
  post: Post;
  isSelected: boolean;
  onPostSelect: HandlePostSelect;
};

export const PostsListItem: React.FC<Props> = ({
  post,
  isSelected,
  onPostSelect,
}) => {
  const { id, title } = post;

  const handleButtonClick = () =>
    isSelected ? onPostSelect(null) : onPostSelect(id);

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': !isSelected,
          })}
          onClick={handleButtonClick}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
