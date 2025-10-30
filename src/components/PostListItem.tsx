import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  post: Post;
  onSelectedPostId: (postId: number) => void;
  selectedPostId: number;
  setOpenForm: (openForm: boolean) => void;
};

export default function PostListItem({
  post,
  onSelectedPostId,
  selectedPostId,
  setOpenForm,
}: Props) {
  const isOpen = selectedPostId === post.id;

  function handleSelectedPostId(postId: number) {
    if (isOpen) {
      onSelectedPostId(0);
    } else {
      onSelectedPostId(postId);
    }
  }

  return (
    <tr data-cy="Post" key={post.id}>
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': !isOpen,
          })}
          onClick={() => {
            handleSelectedPostId(post.id);
            setOpenForm(false);
          }}
        >
          {isOpen ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
}
