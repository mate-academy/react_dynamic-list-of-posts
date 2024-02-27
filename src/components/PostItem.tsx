import React from 'react';
import cl from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  currentPost: Post | null;
  selectPost: (p: Post) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  currentPost,
  selectPost,
}) => {
  const { id: postId, title: postTitle } = post;

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{postId}</td>

      <td data-cy="PostTitle">{postTitle}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cl('button', 'is-link', {
            'is-light': currentPost?.id !== postId,
          })}
          onClick={() => selectPost(post)}
        >
          {currentPost?.id === postId ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
