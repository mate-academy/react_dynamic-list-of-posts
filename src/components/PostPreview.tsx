import React, { FC } from 'react';
import { Post } from '../types/Post';

interface Props {
  post: Post;
  setSelectedPost: React.Dispatch<React.SetStateAction<number>>;
  selectedPost: number
}

export const PostPreview: FC<Props> = ({
  post,
  setSelectedPost,
  selectedPost,
}) => {
  const {
    id,
    title,
  } = post;

  const handlePostSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedPost(Number(event.currentTarget.value));
  };

  const handleClosePost = () => {
    setSelectedPost(0);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">
        {title}
      </td>

      <td className="has-text-right is-vcentered">
        { selectedPost !== id && (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link is-light"
            onClick={handlePostSelection}
            value={id}
          >
            Open
          </button>
        )}
        { selectedPost === id && (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link"
            onClick={handleClosePost}
          >
            Close
          </button>
        )}
      </td>
    </tr>
  );
};
