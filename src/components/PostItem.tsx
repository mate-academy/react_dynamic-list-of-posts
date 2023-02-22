import classNames from 'classnames';
import React from 'react';

import { Post } from '../types/Post';

type Props = {
  post: Post;
  selectedPost: Post | undefined;
  setSelectedPostId: (idpost: number | null) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  setSelectedPostId,
}) => {
  const handleSelectPost = (clickedPost: Post) => {
    const isSamePost = post.id !== selectedPost?.id;

    setSelectedPostId(isSamePost ? clickedPost.id : null);
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
            { 'is-light': selectedPost?.id !== post.id },
          )}
          onClick={() => handleSelectPost(post)}
        >
          {selectedPost?.id === post.id
            ? 'Close'
            : 'Open'}
        </button>
      </td>
    </tr>
  );
};
