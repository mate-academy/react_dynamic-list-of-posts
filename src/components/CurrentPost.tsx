import classnames from 'classnames';
import { usePosts } from '../context/PostsContext';
import { Post } from '../types/Post';

type Props = {
  currentPost: Post;
};

export const CurrentPost: React.FC<Props> = ({ currentPost }) => {
  const { post, setPost } = usePosts();
  const { id, title } = currentPost;

  const handleSelectPost = (selectedPost: Post | null) => {
    if (post?.id !== selectedPost?.id) {
      setPost(selectedPost);

      return;
    }

    setPost(null);
  };

  return (
    <tr data-cy="Post" key={id}>
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">
        {title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classnames('button is-link', {
            'is-light': post?.id !== id,
          })}
          onClick={() => handleSelectPost(currentPost)}
        >
          {(post?.id === id)
            ? 'Close'
            : 'Open'}
        </button>
      </td>
    </tr>
  );
};
