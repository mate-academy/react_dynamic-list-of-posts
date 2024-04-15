import { useCallback, useContext, useMemo } from 'react';
import cn from 'classnames';
import { ErrorMessage, Post, LoadingType, ActionType } from '../types';
import { AppContext, AppDispatchContext } from './AppState';
import { getComments } from '../api/comments';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const { id, title } = post;

  const { selectedPost } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  const isSelected = useMemo(() => {
    return selectedPost?.id === id;
  }, [selectedPost, id]);

  const loadPostComments = useCallback(() => {
    dispatch({
      type: ActionType.SetLoadingType,
      payload: LoadingType.Comments,
    });
    dispatch({
      type: ActionType.SetErrorMessage,
      payload: ErrorMessage.NoError,
    });

    getComments(id)
      .then(comments =>
        dispatch({ type: ActionType.SetComments, payload: comments }),
      )
      .catch(() =>
        dispatch({
          type: ActionType.SetErrorMessage,
          payload: ErrorMessage.LoadingComments,
        }),
      )
      .finally(() =>
        dispatch({
          type: ActionType.SetLoadingType,
          payload: LoadingType.NoLoading,
        }),
      );
  }, [dispatch, id]);

  const handleChangePostState = useCallback(() => {
    dispatch({ type: ActionType.SetComments, payload: [] });

    if (isSelected) {
      dispatch({ type: ActionType.SetSelectedPost, payload: null });

      return;
    }

    dispatch({ type: ActionType.SetSelectedPost, payload: post });
    loadPostComments();
  }, [dispatch, isSelected, loadPostComments, post]);

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button', 'is-link', {
            'is-light': !isSelected,
          })}
          onClick={handleChangePostState}
        >
          {!isSelected ? 'Open' : 'Close'}
        </button>
      </td>
    </tr>
  );
};
