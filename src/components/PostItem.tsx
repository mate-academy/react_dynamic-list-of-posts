import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  selectedPost: Post | null;
  onSelectedPost: (post: Post | null) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  onSelectedPost,
}) => {
  const isOpen = selectedPost?.id === post.id;

  const handleOpenCick = () => {
    if (isOpen) {
      onSelectedPost(null);
    } else {
      onSelectedPost(post);
    }
  };

  return (
    <>
      <tr data-cy="Post">
        <td data-cy="PostId">{post.id}</td>

        <td data-cy="PostTitle">{post.title}</td>

        <td className="has-text-right is-vcentered">
          <button
            type="button"
            data-cy="PostButton"
            className={classNames('button is-link', { 'is-light': !isOpen })}
            onClick={handleOpenCick}
          >
            {isOpen ? 'Close' : 'Open'}
          </button>
        </td>
      </tr>
    </>
  );
};
