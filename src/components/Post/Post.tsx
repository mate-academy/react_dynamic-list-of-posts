import React from 'react';
import { Post } from '../../types/Post';

type Props = {
  post: Post,
  setSelectedPost: (post: Post | null) => void,
  selectedPost: Post | null,
};

export const PostItem: React.FC<Props> = ({
  post,
  setSelectedPost,
  selectedPost,
}) => {
  const { id, title } = post;

  const handleSelectPost = (postItem: Post) => () => {
    setSelectedPost(postItem);
  };

  const handleResetPost = () => {
    setSelectedPost(null);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">
        {title}
      </td>

      <td className="has-text-right is-vcentered">
        {id === selectedPost?.id
          ? (
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link"
              onClick={handleResetPost}
            >
              Close
            </button>
          )
          : (
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
              onClick={handleSelectPost(post)}
            >
              Open
            </button>

          )}

      </td>
    </tr>
  );
};
