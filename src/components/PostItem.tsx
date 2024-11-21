import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  setSelectedPost,
}) => {
  const { id, title } = post;

  const handlePostClick = (postOnClick: Post) => {
    if (selectedPost?.id === id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(postOnClick);
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
          className={classNames('button is-link', {
            'is-light': !(selectedPost?.id === id),
          })}
          onClick={() => handlePostClick(post)}
        >
          {selectedPost?.id === id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
