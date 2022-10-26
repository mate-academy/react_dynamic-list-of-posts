import React from 'react';
import classnames from 'classnames';
import { Post } from '../../types/Post';

type Props = {
  post: Post,
  selectedPost: Post | null,
  onPostSelect: (post: Post | null) => void,
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  onPostSelect,
}) => {
  const { id, title } = post;

  const handlePostSelect = () => {
    if (!selectedPost || selectedPost.id !== id) {
      onPostSelect(post);
    } else if (selectedPost.id === id) {
      onPostSelect(null);
    }
  };

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
          className={
            classnames(
              'button',
              'is-link',
              { 'is-light': id !== selectedPost?.id },
              { 'is-link': selectedPost?.id === id },
            )
          }
          onClick={() => handlePostSelect()}
        >
          {selectedPost?.id === id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
