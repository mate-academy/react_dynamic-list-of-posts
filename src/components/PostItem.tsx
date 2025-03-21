import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  post: Post;
  selected: Post | null;
  onSelect: (post: Post | null) => void;
};

export const PostsItem: React.FC<Props> = ({ post, selected, onSelect }) => {
  const { id, title } = post;
  const handleSelect = () => {
    if (id === selected?.id) {
      onSelect(null);

      return;
    }

    onSelect(post);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>
      <td data-cy="PostTitle">{title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': selected?.id !== id,
          })}
          onClick={handleSelect}
        >
          {selected?.id === id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
