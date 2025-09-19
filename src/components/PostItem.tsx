import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  selectedPost: Post | null;
  setDisplayCommentButton: (value: boolean) => void;
  onSelectPost: (post: Post | null) => void;
  setDisplayNewCommentForm: (value: boolean) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  onSelectPost,
  setDisplayNewCommentForm,
  setDisplayCommentButton,
}) => {
  function handleTogglePost() {
    if (selectedPost?.id === post.id) {
      onSelectPost(null);
      setDisplayNewCommentForm(false);
      setDisplayCommentButton(false);
    } else {
      onSelectPost(post);
      setDisplayCommentButton(true);
      setDisplayNewCommentForm(false);
    }
  }

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': selectedPost?.id !== post.id,
          })}
          onClick={handleTogglePost}
        >
          {selectedPost?.id === post.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
