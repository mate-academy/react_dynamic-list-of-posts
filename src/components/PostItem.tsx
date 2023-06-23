import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  setIsPostOpen: (post: Post | null) => void;
  isPostOpen: Post | null;
};

export const PostItem: React.FC<Props> = ({
  post,
  setIsPostOpen,
  isPostOpen,
}) => {
  const {
    id,
    title,
  } = post;
  const handlePostButton = (postActive: Post) => {
    if (!isPostOpen || postActive !== isPostOpen) {
      setIsPostOpen(postActive);
    } else {
      setIsPostOpen(null);
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
          className={classNames('button is-link',
            { 'is-light': isPostOpen?.id !== id })}
          onClick={() => handlePostButton(post)}
        >
          {
            isPostOpen?.id === id ? 'Close' : 'Open'
          }
        </button>
      </td>
    </tr>
  );
};
