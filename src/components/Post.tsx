import classNames from 'classnames';
import { PostInt } from '../types/PostInt';

type PostProps = {
  post: PostInt,
  selectedPost: PostInt | undefined,
  setSelectedPost: (newPost: PostInt | undefined) => void,
};

export const Post: React.FC<PostProps> = ({
  post,
  selectedPost,
  setSelectedPost,
}) => {
  const handleSelectPost = (newPost: PostInt | undefined) => {
    setSelectedPost(newPost);
  };

  const isPostSelected = post.id === selectedPost?.id;

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
          className={classNames('button', 'is-link', {
            'is-light': !isPostSelected,
          })}
          onClick={() => {
            return isPostSelected
              ? handleSelectPost(undefined)
              : handleSelectPost(post);
          }}
        >
          {isPostSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
