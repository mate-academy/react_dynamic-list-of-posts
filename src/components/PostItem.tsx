import { FC } from 'react';
import { Post } from '../types/Post';
import { useAppContext } from '../context/AppContext';

type Props = {
  post: Post,
};

export const PostItem: FC<Props> = ({ post }) => {
  const { selectedPost, setSelectedPost } = useAppContext();

  const handleToggleOpenPost = () => {
    if (selectedPost?.id !== post.id) {
      setSelectedPost(post);

      return;
    }

    setSelectedPost(null);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className="button is-link is-light is-active"
          onClick={handleToggleOpenPost}
        >
          {
            post.id === selectedPost?.id
              ? 'Close'
              : 'Open'
          }
        </button>
      </td>
    </tr>
  );
};
