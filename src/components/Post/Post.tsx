import classNames from 'classnames';
import { PostType } from '../../types/Post';

type Props = {
  post: PostType,
  selectedPost: PostType | null,
  onSelectPost: (post: PostType) => void,
};

export const Post: React.FC<Props> = ({
  post,
  selectedPost,
  onSelectPost,
}) => {
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
          className={classNames('button is-link', {
            'is-light': selectedPost?.id !== post.id,
          })}
          onClick={() => onSelectPost(post)}
        >
          {selectedPost?.id !== post.id ? 'Open' : 'Close'}
        </button>
      </td>
    </tr>
  );
};
