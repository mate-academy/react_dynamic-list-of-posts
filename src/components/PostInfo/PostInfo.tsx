import { useContext } from 'react';
import { Post } from '../../types/Post';
import { PostUpdateContext, PostsContext } from '../../contexts/PostProvider';

interface Props {
  post: Post,
}

export const PostInfo:React.FC<Props> = ({ post }) => {
  const { setSelectedPost } = useContext(PostUpdateContext);
  const { selectedPost } = useContext(PostsContext);
  const isSelected = selectedPost?.id === post.id;

  const handleNewPostSelected = () => {
    setSelectedPost(isSelected ? null : post);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={handleNewPostSelected}
          type="button"
          data-cy="PostButton"
          className={`button ${isSelected ? 'is-link' : 'is-light'}`}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
