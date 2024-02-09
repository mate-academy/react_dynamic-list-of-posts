import { useContext } from 'react';
import cn from 'classnames';
import { Post } from '../../types/Post';
import { MainContext } from '../MainContext/MainContext';
import { getComments } from '../../api/comments';
import { Errors } from '../../types/Errors';

type Props = {
  post: Post,
  isActive: number | null,
  setIsActive: (value: number | null) => void,
};

export const PostItem: React.FC<Props> = ({ post, isActive, setIsActive }) => {
  const {
    chosenPost,
    setChosenPost,
    setComments,
    setError,
    setIsLoading,
    setIsActiveComForm,
  } = useContext(MainContext);

  const { id, title } = post;

  const handleOpenPost = (openedPost: Post): void => {
    setComments([]);
    setIsActiveComForm(false);

    if (chosenPost?.id === openedPost.id) {
      setChosenPost(null);

      setIsActive(null);

      return;
    }

    setIsActive(openedPost.id);
    setChosenPost(openedPost);
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
