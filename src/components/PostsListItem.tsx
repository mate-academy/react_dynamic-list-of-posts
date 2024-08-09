import React from 'react';
import { Post } from '../types/Post';
import { useValues } from '../SharedContext';
import cn from 'classnames';

type Props = {
  post: Post;
};

export const PostsListItem: React.FC<Props> = ({ post }) => {
  const { id, title } = post;
  const { selectedPost, handleSelectPost, handleClosePostDetails } =
    useValues();

  const isSelected = selectedPost?.id !== id;

  const handleButtonClick = () =>
    isSelected ? handleSelectPost(id) : handleClosePostDetails();

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        {
          <button
            type="button"
            data-cy="PostButton"
            className={cn(
              'button is-link',
              {
                'is-light': isSelected,
              },
              { 'is-focus': !isSelected },
            )}
            onClick={handleButtonClick}
          >
            {isSelected ? 'Open' : 'Close'}
          </button>
        }
      </td>
    </tr>
  );
};
