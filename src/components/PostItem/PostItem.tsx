import { useContext } from 'react';
import cn from 'classnames';
import { Post } from '../../types/Post';
import { DispatchContext, StateContext } from '../../store/store';

type Props = {
  post: Post
};
export const PostItem: React.FC<Props> = ({ post }) => {
  const { id, title } = post;

  const dispatch = useContext(DispatchContext);
  const { selectedPost } = useContext(StateContext);

  function handleSelectPost() {
    if (selectedPost?.id === id) {
      dispatch({ type: 'setSeletedPost', payload: null });

      return;
    }

    dispatch({ type: 'setSeletedPost', payload: post });
  }

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
          className={cn('button is-link', {
            'is-light': selectedPost?.id !== id,
          })}
          onClick={handleSelectPost}
        >
          {selectedPost?.id === id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
