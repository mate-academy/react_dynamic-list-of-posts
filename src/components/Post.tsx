import classNames from 'classnames';
import { Post } from '../types/Post';
import { useContext } from 'react';
import { PostContext } from '../context/PostContextProvider';

export interface PostType {
  post: Post;
  handleOpenPost: (post: Post, isActive: boolean) => void;
}

export const PostComponent: React.FC<PostType> = ({ post, handleOpenPost }) => {
  const postContext = useContext(PostContext);

  const isActive = !postContext.post || post.id !== postContext.post.id;

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': isActive,
          })}
          onClick={() => handleOpenPost(post, isActive)}
        >
          {!isActive ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
