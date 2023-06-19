import React from 'react';
import { Post } from '../types/Post';

type Props = {
  post: Post,
  currentPost: Post | null,
  setCurrentPost: (post: Post | null) => void,
};

export const PostItem: React.FC<Props> = ({
  post,
  currentPost,
  setCurrentPost,
}) => {
  const { id, title } = post;
  const isCurrent = currentPost?.id === id;

  const handleOpenDetails = () => {
    setCurrentPost(post);
  };

  const handleCloseDetails = () => {
    setCurrentPost(null);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">
        {title}
      </td>

      <td className="has-text-right is-vcentered">
        {isCurrent ? (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link"
            onClick={handleCloseDetails}
          >
            Close
          </button>
        ) : (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link is-light"
            onClick={handleOpenDetails}
          >
            Open
          </button>
        )}
      </td>
    </tr>
  );
};
