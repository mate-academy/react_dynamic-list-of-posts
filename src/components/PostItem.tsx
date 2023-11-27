import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  selectedPost: Post | null;
  postButtonClickHandler: (post: Post) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  postButtonClickHandler,
}) => {
  return (
    <tr key={post.id} data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button', 'is-link', {
            'is-light': selectedPost?.id !== post.id,
          })}
          onClick={() => postButtonClickHandler(post)}
        >
          {selectedPost?.id !== post.id ? 'Open' : 'Close'}
        </button>
      </td>
    </tr>
  );
};
