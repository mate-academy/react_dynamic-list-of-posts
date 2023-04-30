import React from 'react';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  isPostSelected: boolean;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostCell: React.FC<Props> = React.memo(({
  post,
  isPostSelected,
  setSelectedPost,
}) => {
  const handleOpenPost = () => {
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        {isPostSelected
          ? (
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
              onClick={handleClosePost}
            >
              Close
            </button>
          )
          : (
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
              onClick={handleOpenPost}
            >
              Open
            </button>
          )}
      </td>
    </tr>
  );
});
