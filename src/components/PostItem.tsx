import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  selectedPost: Post | null;
  handleOpenPost: (post: Post) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  handleOpenPost,
}) => {
  return (
    <tr data-cy="Post" key={post.id}>
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn(
            'button is-link',
            { 'is-light': selectedPost?.id !== post.id },
          )}
          onClick={() => handleOpenPost(post)}
        >
          {selectedPost?.id === post.id
            ? 'Close'
            : 'Open'}
        </button>
      </td>
    </tr>
  );
};
