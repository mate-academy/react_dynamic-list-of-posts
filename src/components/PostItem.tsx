import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post,
  selectedPost: Post,
  openPost: (postId: number, post: Post) => void,
};

export const PostItem: React.FC<Props> = ({ post, selectedPost, openPost }) => {
  return (
    <tr
      data-cy="Post"
      key={post.id}
    >
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': post.id !== selectedPost.id,
          })}
          onClick={() => openPost(post.id, post)}
        >
          {
            post.id === selectedPost.id ? (
              'Close'
            ) : (
              'Open'
            )
          }
        </button>
      </td>
    </tr>
  );
};
