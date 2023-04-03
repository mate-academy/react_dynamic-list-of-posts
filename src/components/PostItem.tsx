import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  handlePostSelect: (post: Post) => void;
  selectedPost: Post | null;
};

export const PostItem: React.FC<Props> = ({
  post,
  handlePostSelect,
  selectedPost,
}) => {
  const isPostSelected = post.id === selectedPost?.id;

  return (
    <tr
      key={post.id}
      data-cy="Post"
    >
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames(
            'button is-link',
            { 'is-light': !isPostSelected },
          )}
          onClick={() => handlePostSelect(post)}
        >
          {isPostSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
