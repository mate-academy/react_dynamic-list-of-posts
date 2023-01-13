import React from 'react';
import cn from 'classnames';

import { Post } from '../types/Post';

type Props = {
  post: Post;
  selectedPost: Post | undefined;
  setSelectedPostId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const PostItem: React.FC<Props> = (props) => {
  const {
    post,
    selectedPost,
    setSelectedPostId,
  } = props;

  const handleClick = (postClicked: Post) => {
    const isFirstClick = post.id !== selectedPost?.id;

    if (isFirstClick) {
      setSelectedPostId(postClicked.id);
    } else {
      setSelectedPostId(null);
    }
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
          className={cn(
            'button is-link',
            { 'is-light': selectedPost?.id !== post.id },
          )}
          onClick={() => handleClick(post)}
        >
          {selectedPost?.id === post.id
            ? 'Close'
            : 'Open'}
        </button>
      </td>
    </tr>
  );
};
