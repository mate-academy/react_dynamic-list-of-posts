import { FC } from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post,
  isSelected: boolean,
  setSelectedPost: (post: Post | null) => void,
};

export const PostItem: FC<Props> = ({ post, isSelected, setSelectedPost }) => {
  const handlePostButton = () => {
    setSelectedPost(isSelected ? null : post);
  };

  return (
    <tr key={post.id} data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={handlePostButton}
          type="button"
          data-cy="PostButton"
          className={cn(
            'button',
            'is-link',
            { 'is-light': !isSelected },
          )}
        >
          {!isSelected ? 'Open' : 'Close'}
        </button>
      </td>
    </tr>
  );
};
