import { useContext, useState } from 'react';
import classNames from 'classnames';
import { Post } from '../../types/Post';
import { PostsContext } from '../PostsContext';
import { Load } from '../../types/Load';

export const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const {
    currentPost,
    setIsForm,
    setComments,
    setLoadType,
    setIsAddButton,
    setCurrentPost,
    setNotification,
  } = useContext(PostsContext);
  const [isOpen, setIsOpen] = useState(false);
  const isActive = currentPost?.id === post.id;
  const toggleCurrentPost = isActive ? null : post;

  const handleClick = () => {
    setNotification('');
    setIsAddButton(false);
    setIsForm(false);
    setLoadType(!isOpen ? Load.None : Load.Comments);
    setCurrentPost(toggleCurrentPost);
    setComments([]);
    setIsOpen(!isOpen);
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
          className={classNames(
            'button is-link',
            { 'is-light': !isActive },
            { 'is-dark': isActive },
          )}
          onClick={handleClick}
        >
          {isActive ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
