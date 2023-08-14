import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post,
  selectedPostId: number,
  onPostSelect: (postId: number) => void
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPostId,
  onPostSelect,
}) => {
  const handleSelectPost = (postId: number) => {
    if (postId === selectedPostId) {
      onPostSelect(0);

      return;
    }

    onPostSelect(postId);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames(
            'button is-link',
            { 'is-light': selectedPostId !== post.id },
          )}
          onClick={() => handleSelectPost(post.id)}
        >
          {selectedPostId === post.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
