import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type PostItemProps = {
  post: Post;
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostItem: React.FC<PostItemProps> = ({
  post,
  selectedPost,
  setSelectedPost,
}) => {
  const { id, title } = post;
  const isSelected = selectedPost === post;

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
          onClick={() => {
            setSelectedPost(isSelected ? null : post);
          }}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
