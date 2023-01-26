import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  selectedPostId: number;
  handlePostSelect: (post: Post) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  handlePostSelect,
  selectedPostId,
}) => (
  <tr data-cy="Post">
    <td data-cy="PostId">{post.id}</td>

    <td data-cy="PostTitle">
      {post.title}
    </td>

    <td className="has-text-right is-vcentered">
      <button
        type="button"
        data-cy="PostButton"
        onClick={() => handlePostSelect(post)}
        className={classNames(
          'button is-link',
          {
            'is-light': post.id !== selectedPostId,

          },
        )}
      >
        {post.id !== selectedPostId ? ('Open') : ('Close')}
      </button>
    </td>
  </tr>
);
