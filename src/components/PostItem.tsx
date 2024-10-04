import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

// import { PostDetails } from './PostDetails';

interface Props {
  post: Post;
  openedPost?: Post | null;
  setOpenedPost: (post: Post | null) => void;
}

export const PostItem: React.FC<Props> = ({
  post: { id, title, body, userId },
  openedPost,
  setOpenedPost,
}) => {
  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': id !== openedPost?.id,
          })}
          onClick={() => {
            if (openedPost?.id !== id) {
              setOpenedPost({ id, title, body, userId });
            } else {
              setOpenedPost(null);
            }
          }}
        >
          {openedPost?.id === id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
