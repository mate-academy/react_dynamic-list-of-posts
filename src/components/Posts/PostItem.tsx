import { FC } from 'react';
import cn from 'classnames';
import { Post } from '../../types/Post';
import { useUiStore } from '../../store/uiStore';
import { usePostStore } from '../../store/postStore';

type Props = {
  post: Post;
};
export const PostItem: FC<Props> = ({ post }) => {
  const setIsSidebarOpen = useUiStore((state) => state.setIsSidebarOpen);
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const selectPost = usePostStore(state => state.selectPost);

  const onClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
    selectPost(post);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', {
            'is-light': !isSidebarOpen,
          })}
          onClick={onClick}
        >
          {isSidebarOpen ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
