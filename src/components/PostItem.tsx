import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  toggleSelectedPostFunction: (post: Post) => void;
  selectedPost: Post | null;
};

export const PostItem: React.FC<Props> = ({
  post,
  toggleSelectedPostFunction,
  selectedPost,
}) => {
  const toggleSelectedPostHandler = () => toggleSelectedPostFunction(post);

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
            'is-light': post.id !== selectedPost?.id,
          })}
          onClick={toggleSelectedPostHandler}
        >
          {post.id !== selectedPost?.id ? 'Open' : 'Close'}
        </button>
      </td>
    </tr>
  );
};
