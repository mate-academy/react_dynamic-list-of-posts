import { useContext } from 'react';
import cn from 'classnames';
import { Post } from '../../types/Post';
import { UserContext } from '../UserContext/UserContext';
import { getComments } from '../../api/comments';
import { Errors } from '../../types/Errors';

type Props = {
  post: Post,
  isActive: number | null,
  setIsActive: (value: number | null) => void,
};

export const PostItem: React.FC<Props> = ({ post, isActive, setIsActive }) => {
  const {
    choosedPost,
    setChoosedPost,
    setComments,
    setError,
    setIsLoading,
    setIsActiveComForm,
  } = useContext(UserContext);

  const { id, title } = post;

  const handleOpenPost = (openedPost: Post): void => {
    setComments(undefined);
    setIsActiveComForm(false);

    if (choosedPost?.id === openedPost.id) {
      setChoosedPost(undefined);

      setIsActive(null);

      return;
    }

    setIsActive(openedPost.id);
    setChoosedPost(openedPost);
    setIsLoading(true);

    getComments(openedPost.id)
      .then(setComments)
      .catch(() => setError(Errors.COMMENT))
      .finally(() => setIsLoading(false));
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">
        {title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button', 'is-link', {
            'is-light': isActive !== id,
          })}
          onClick={() => handleOpenPost(post)}
        >
          {isActive !== id ? ('Open') : ('Close')}
        </button>
      </td>
    </tr>
  );
};
