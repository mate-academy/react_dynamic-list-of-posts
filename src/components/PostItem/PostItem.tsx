import classNames from 'classnames';
import React, { useContext } from 'react';
import { OpenPostContext } from '../../App';

type Props = {
  id: number;
  title: string;
  handleOpenPost: (id: number) => void;
};

export const PostItem: React.FC<Props> = ({ id, title, handleOpenPost }) => {
  const openPost = useContext(OpenPostContext);

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>
      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': openPost?.id !== id,
          })}
          onClick={() => handleOpenPost(id)}
        >
          {openPost?.id === id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
