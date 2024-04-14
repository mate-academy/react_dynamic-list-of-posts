import React, { useContext } from 'react';
import { Post } from '../types/Post';
import { StateContext } from '../store/store';
import classNames from 'classnames';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const { currentPost, setCurrentPost, setVisibleForm } =
    useContext(StateContext);

  const handleOpenSidebar = () => {
    setCurrentPost(prevPost => (prevPost === post ? null : post));
    setVisibleForm(false);
  };

  const { id, title } = post;

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          onClick={handleOpenSidebar}
          className={classNames('button', 'is-link', {
            'is-light': currentPost?.id !== id,
          })}
        >
          {currentPost?.id === id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
