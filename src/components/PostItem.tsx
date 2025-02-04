import React from 'react';
import cn from 'classnames';

import { Post } from '../types/Post';

type Props = {
  post: Post;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  setSelectedPost,
}) => {
  const handleSelectedPost = () => {
    if (post.id === selectedPost?.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', {
            'is-light': selectedPost?.id !== post.id,
          })}
          onClick={handleSelectedPost}
        >
          Open
        </button>
      </td>
    </tr>
  );
};
