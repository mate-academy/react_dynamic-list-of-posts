import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  isActive: boolean;
  onClick: (selectedPost: Post | null) => void;
};

export const PostItem: React.FC<Props> = ({ post, isActive, onClick }) => {
  const buttonText = isActive ? 'Close' : 'Open';

  const handleClick = () => {
    onClick(isActive ? null : post);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', {
            'is-light': !isActive,
          })}
          onClick={handleClick}
        >
          {buttonText}
        </button>
      </td>
    </tr>
  );
};
