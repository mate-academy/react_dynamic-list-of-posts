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
  return (
    <tr data-cy="Post" key={post.id}>
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cl('button', 'is-link', {
            'is-light': currentPost?.id !== post.id,
          })}
          onClick={() => selectPost(post)}
        >
          {currentPost?.id === post.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
