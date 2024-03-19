import cn from 'classnames';
import { Post } from '../../types';
import { useComments, usePosts } from '../../context';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const { id, title } = post;

  const { openedPost, handleOpenPost } = usePosts();

  const { handleToggleWriteComment } = useComments();

  const isPostOpen = (postId: number) => postId === openedPost?.id;

  const handleOpenPostClick = (postData: Post) => {
    handleOpenPost(postData);
    handleToggleWriteComment(false);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={() => handleOpenPostClick(post)}
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
