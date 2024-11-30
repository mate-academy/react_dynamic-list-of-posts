import { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';

import { Post } from '../types';

type Props = {
  post: Post;
  selectedPost: Post | null;
  onSelectPost: Dispatch<SetStateAction<Post | null>>;
};

export const PostItem: FC<Props> = ({ post, selectedPost, onSelectPost }) => {
  const { id, title } = post;

  const isSelected = id === selectedPost?.id;

  const handleSelectPost = () => {
    if (selectedPost?.id === id) {
      onSelectPost(null);
    } else {
      onSelectPost(post);
    }
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', { 'is-light': !isSelected })}
          onClick={handleSelectPost}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
