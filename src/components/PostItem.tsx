import { Post } from '../types/Post';
import { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';

interface PostItemProps {
  post: Post;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { selectedPost, setSelectedPost } = useContext(PostsContext);

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        {selectedPost && selectedPost.id === post.id ? (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link"
            onClick={() => {
              setSelectedPost(null);
            }}
          >
            Close
          </button>
        ) : (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link is-light"
            onClick={() => {
              setSelectedPost(post);
            }}
          >
            Open
          </button>
        )}
      </td>
    </tr>
  );
};
