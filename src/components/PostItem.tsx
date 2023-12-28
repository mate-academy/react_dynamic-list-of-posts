import React, { useContext } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { PostsContext } from '../store/PostsContext';

interface Props {
  post: Post,
}

export const PostItem: React.FC<Props> = ({ post }) => {
  const { selectedPost, setSelectedPost } = useContext(PostsContext);
  const isOpened = selectedPost?.id === post.id;

  const butttonClasses = classNames(
    'button',
    'is-link',
    { 'is-light': !isOpened },
  );

  const handleOpenCloseButtonClick = () => {
    if (!isOpened) {
      setSelectedPost(post);
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
          className={butttonClasses}
          onClick={handleOpenCloseButtonClick}
        >
          {!isOpened ? 'Open' : 'Close'}
        </button>
      </td>
    </tr>
  );
};
