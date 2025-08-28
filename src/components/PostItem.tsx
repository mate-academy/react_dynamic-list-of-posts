import React from 'react';
import { Post } from '../types/Post';

interface Props {
  post: Post;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  getCommentsFromServer: (postId: number) => Promise<void>;
  setIsFormVisible: (value: boolean) => void;
}

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  setSelectedPost,
  getCommentsFromServer,
  setIsFormVisible,
}) => {
  const isClose = post.id === selectedPost?.id;

  function handlePostDetails() {
    setSelectedPost(post);
    getCommentsFromServer(post.id);
  }

  function handleClosePostDetails() {
    setSelectedPost(null);
    setIsFormVisible(false);
  }

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        {isClose ? (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link"
            onClick={handleClosePostDetails}
          >
            Close
          </button>
        ) : (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link is-light"
            onClick={handlePostDetails}
          >
            Open
          </button>
        )}
      </td>
    </tr>
  );
};
