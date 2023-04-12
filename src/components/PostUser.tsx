import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post,
  activePost: Post | null,
  handlerSideBar: (post: Post) => void
};

export const PostUser: React.FC<Props> = ({
  post,
  activePost,
  handlerSideBar,
}) => {
  const { id, title } = post;

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">
        {title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={
            classNames(
              'button is-link',
              { 'is-light': id !== activePost?.id },
            )
          }
          onClick={() => handlerSideBar(post)}
        >
          {id === activePost?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
