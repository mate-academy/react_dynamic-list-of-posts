import React from 'react';
import { Post as PostUser } from '../types/Post';
import cn from 'classnames';

type Props = {
  post: PostUser;
  setSelectedPost: (post: PostUser | null) => void;
  selectedPost: PostUser | null;
};

export const Post: React.FC<Props> = props => {
  const { post, setSelectedPost, selectedPost } = props;

  const isNotCurrentPost = selectedPost?.id !== post.id;

  const handleOpenDetails = () => {
    if (!selectedPost || isNotCurrentPost) {
      setSelectedPost(post);
    } else {
      setSelectedPost(null);
    }
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={handleOpenDetails}
          type="button"
          data-cy="PostButton"
          className={cn(`button is-link`, {
            'is-light': isNotCurrentPost,
          })}
        >
          {isNotCurrentPost ? 'Open' : 'Close'}
        </button>
      </td>
    </tr>
  );
};
