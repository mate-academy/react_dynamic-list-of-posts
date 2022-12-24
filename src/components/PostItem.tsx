import React from 'react';
import { Post } from '../types/Post';

type Props = {
  post: Post,
  setSelectedPost: (post: Post | null) => void,
  selectedPostId: number | undefined,
};

export const PostItem: React.FC<Props> = ({
  post,
  setSelectedPost,
  selectedPostId,
}) => {
  const handlerShowDetails = () => {
    if (selectedPostId === post.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        {selectedPostId === post.id ? (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link"
            onClick={() => handlerShowDetails()}
          >
            Close
          </button>
        ) : (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link is-light"
            onClick={() => handlerShowDetails()}
          >
            Open
          </button>
        )}
      </td>

    </tr>
  );
};
