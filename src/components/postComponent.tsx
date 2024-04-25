import React, { useContext } from 'react';
import { Post } from '../types/Post';

import classNames from 'classnames';
import { PostContext } from '../contexts/postContext';
import { getComments } from '../api/users';

interface PostProps {
  post: Post;
}

export const PostComponent: React.FC<PostProps> = ({ post }) => {
  const {
    activePostId,
    setactivePostId,
    setCurrentPost,
    setPostComments,
    setIsErrorCommentsShown,
    setIsCommentsLoaderShown,
    setIsFormOpened,
  } = useContext(PostContext);

  const handleOpenCloseButton = () => {
    setactivePostId(
      activePostId === 0 || (activePostId !== 0 && activePostId !== post.id)
        ? post.id
        : 0,
    );

    setCurrentPost(post);

    setIsCommentsLoaderShown(true);
    setIsErrorCommentsShown(false);
    setIsFormOpened(false);

    getComments(post.id)
      .then(setPostComments)
      .catch(() => {
        setIsErrorCommentsShown(true);
      })
      .finally(() => {
        setIsCommentsLoaderShown(false);
      });
  };

  const buttonClass = classNames({
    button: true,
    'is-link': true,
    'is-light': activePostId !== post.id,
  });

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={handleOpenCloseButton}
          type="button"
          data-cy="PostButton"
          className={buttonClass}
        >
          {activePostId === post.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
