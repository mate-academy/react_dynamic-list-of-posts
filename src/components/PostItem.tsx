import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { postShape } from '../types/propShapes';

interface PostItemProps {
  post: Post;
  isSelected: boolean;
  onSelectPost: (id: number) => void;
}

export const PostItem: React.FC<PostItemProps> = ({
  post,
  onSelectPost,
  isSelected,
}) => {
  return (
    <>
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': !isSelected,
          })}
          onClick={() => onSelectPost(post.id)}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </>
  );
};

PostItem.propTypes = {
  post: postShape.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelectPost: PropTypes.func.isRequired,
};
