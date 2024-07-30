import classNames from 'classnames';
import { Post } from '../../types/Post';

type Props = {
  post: Post;
  chosenPost: Post | null;
  onClickPost: (post: Post | null) => void;
};

const PostInfo = ({ post, chosenPost, onClickPost }: Props) => {
  const { id, title } = post;

  const handleClickUser = () => {
    if (chosenPost?.id === id) {
      return onClickPost(null);
    }

    return onClickPost(post);
  };

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
          onClick={handleClickUser}
        >
          {chosenPost?.id !== id ? 'Open' : 'Close'}
        </button>
      </td>
    </tr>
  );
};

export default PostInfo;
