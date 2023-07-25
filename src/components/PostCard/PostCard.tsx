import classNames from 'classnames';
import React from 'react';
import { Post } from '../../types/Post';

type Props = {
  post: Post;
  loadPost: (id: number) => void;
  setSelectedPost: (post: Post | null) => void;
  selectedPost: Post | null,
};

export const PostCard: React.FC<Props> = ({
  post,
  loadPost,
  setSelectedPost,
  selectedPost,
}) => {
  const btnTitle = selectedPost?.id !== post.id ? 'Open' : 'Close';

  const openPostHandler = (postId: number) => {
    if (btnTitle === 'Open') {
      loadPost(postId);
    } else {
      setSelectedPost(null);
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
          className={classNames('button is-link', {
            'is-light': selectedPost?.id !== post.id,
          })}
          onClick={() => openPostHandler(post.id)}
        >
          {btnTitle}
        </button>
      </td>
    </tr>
  );
};
