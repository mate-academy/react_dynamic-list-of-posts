import classNames from 'classnames';
import React from 'react';
import { Post } from '../types';

type Props = {
  post: Post,
  selectedPost: Post | null,
  setSelectedPost: (id: Post | null) => void,
  setIsCommentLoading: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  setSelectedPost,
  setIsCommentLoading,
}) => {
  const { id, title } = post;
  const isSelectedPost = selectedPost?.id !== post.id;

  const togglePost = () => {
    if (!isSelectedPost) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }

    setIsCommentLoading(true);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>
      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          onClick={togglePost}
          data-cy="PostButton"
          className={classNames(
            'button',
            'is-link',
            { 'is-light': isSelectedPost },
          )}
        >
          {!isSelectedPost ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
