import classNames from 'classnames';
import { Post } from '../../types/Post';

type Props = {
  post: Post;
  chosenPost: Post | null;
  onClickPost: (post: Post) => void;
};

const PostInfo = ({ post, chosenPost, onClickPost }: Props) => {
  const { id, title } = post;

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': chosenPost?.id !== id,
          })}
          onClick={() => onClickPost(post)}
        >
          Open
        </button>
      </td>
    </tr>
  );
};

export default PostInfo;
