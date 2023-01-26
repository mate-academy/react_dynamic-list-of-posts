import { FC } from 'react';
import { Post } from '../../types/Post';
import { useUiStore } from '../../store/uiStore';
import { usePostStore } from '../../store/postStore';

type Props = {
  post: Post;
};
export const PostItem: FC<Props> = ({ post }) => {
  const setIsSidebarOpen = useUiStore((state) => state.setIsSidebarOpen);
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const selectPost = usePostStore((state) => state.selectPost);
  const selectedPost = usePostStore((state) => state.selectedPost);

  const onClose = () => {
    setIsSidebarOpen(false);
  };

  const onOpen = () => {
    if (isSidebarOpen) {
      selectPost(post);
    } else {
      setIsSidebarOpen(true);
      selectPost(post);
    }
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        {isSidebarOpen && selectedPost?.id === post.id ? (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link"
            onClick={onClose}
          >
            Close
          </button>
        ) : (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link is-light"
            onClick={onOpen}
          >
            Open
          </button>
        )}
      </td>
    </tr>
  );
};
