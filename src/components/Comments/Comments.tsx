import { useCallback, useContext } from 'react';
import { Loader, NotificationBlock } from '../common';
import { DispatchContext, StateContext } from '../../store';
import { CommentsList } from './CommentsList';
import { actions } from '../../libs/actions/actions';

export const Comments: React.FC = () => {
  const {
    common: { isLoading, errorMessage, isShowAddCommentForm },
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const isShowComments = !isLoading && !errorMessage;

  const handleShowForm = useCallback(() => {
    actions.showAddCommentsForm(dispatch);
  }, [dispatch]);

  return (
    <div className="block">
      <Loader />
      <NotificationBlock dataCy="CommentsError" />

      {isShowComments && (
        <>
          <CommentsList />

          {!isShowAddCommentForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleShowForm}
            >
              Write a comment
            </button>
          )}
        </>
      )}
    </div>
  );
};
