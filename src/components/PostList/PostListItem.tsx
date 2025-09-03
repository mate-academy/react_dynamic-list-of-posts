import classNames from 'classnames';
import { Post } from '../../types/Post';

type Props = {
  post: Post;
  toggleSidebar: (postId: number) => void;
  selectedPost: Post | null;
};

export const PostListItem: React.FC<Props> = ({
  post,
  toggleSidebar,
  selectedPost,
}) => {
  return (
    <tr data-cy="Post" key={post.id}>
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': selectedPost?.id !== post.id,
          })}
          onClick={() => {
            toggleSidebar(post.id);
          }}
        >
          {selectedPost?.id === post.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
