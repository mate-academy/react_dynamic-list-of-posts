import { useContext } from 'react';
import classNames from 'classnames';
import { Post } from '../../types/Post';
import { ModalPostContext } from '../ModalPostContext';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const { modalPost, setModalPost } = useContext(ModalPostContext);
  const { id, title } = post;

  const isOpen = id !== modalPost?.id;

  const handlePostButtonClick = () => {
    if (isOpen) {
      setModalPost(post);

      return;
    }

    setModalPost(null);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">
        {id}
      </td>

      <td data-cy="PostTitle">
        {title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': isOpen,
          })}
          onClick={handlePostButtonClick}
        >
          {isOpen ? 'Open' : 'Close'}
        </button>
      </td>
    </tr>
  );
};
