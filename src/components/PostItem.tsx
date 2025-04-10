import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  setSelectedPost: (post: Post | null) => void;
  selectedPost: Post | null;
};

export const PostItem: React.FC<Props> = ({
  post,
  setSelectedPost,
  selectedPost,
}) => {
  const { id, title } = post;

  const opened = () => {
    if (selectedPost?.id === id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
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
          onClick={opened}
          className={classNames('button is-link', {
            'is-light': selectedPost?.id !== id,
          })}
        >
          {selectedPost?.id !== id ? 'Open' : 'Close'}
        </button>
      </td>
    </tr>
  );
};
