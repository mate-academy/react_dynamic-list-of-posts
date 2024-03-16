import cn from 'classnames';
import { Post } from '../../types';
import { usePosts } from '../../context';

interface Props {
  post: Post;
}

export const PostItem: React.FC<Props> = ({ post }) => {
  const { id, title } = post;

  const { openedPost, hadndleOpenPost } = usePosts();

  const isPostOpen = (postId: number) => postId === openedPost?.id;

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={() => hadndleOpenPost(post)}
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', {
            'is-light': !isPostOpen(post.id),
          })}
        >
          {isPostOpen(post.id) ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
