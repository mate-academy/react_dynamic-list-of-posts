import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post,
  selectedPost: Post | null,
  setSelectedPost: (post: Post | null) => void,
};

export const PostInfo: React.FC<Props> = ({
  post,
  selectedPost,
  setSelectedPost,
}) => {
  const isSelected = () => post.id === selectedPost?.id;
  const handlePostSelect = () => {
    if (isSelected()) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
  };

  return (
    <tr data-cy="Post" key={post.id}>
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn(
            'button',
            'is-link',
            { 'is-light': !isSelected() },
          )}
          onClick={handlePostSelect}
        >
          {isSelected()
            ? 'Close'
            : 'Open'}
        </button>
      </td>
    </tr>
  );
};
