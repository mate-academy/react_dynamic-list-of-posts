import classNames from 'classnames';
import React from 'react';

type Props = {
  id: number;
  title: string;
  selectedPostId: number | undefined;
  handlePostInfo: (id: number) => void;
};

export const PostItem: React.FC<Props> = ({
  id,
  title,
  selectedPostId,
  handlePostInfo,
}) => {
  return (
    <tr data-cy="Post" key={id}>
      <td data-cy="PostId">{id}</td>
      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': selectedPostId !== id,
          })}
          onClick={() => handlePostInfo(id)}
        >
          {selectedPostId === id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
