import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { AppContext, AppDispatchContext } from './AppState';
import { ErrorMessage, Post, LoadingType, ActionType, Comment } from '../types';
import { CommentItem } from './CommentItem';
import { deleteComment } from '../api/comments';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [hasForm, setHasForm] = useState(false);
  const { comments, errorMessage, loadingType } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  const { id, title, body } = selectedPost;

  const isLoading = useMemo(
    () => loadingType === LoadingType.Comments,
    [loadingType],
  );

  const hasError = useMemo(
    () => errorMessage === ErrorMessage.LoadingComments,
    [errorMessage],
  );

  const hasDeletingError = useMemo(
    () => errorMessage === ErrorMessage.DeletingComment,
    [errorMessage],
  );

  useEffect(() => {
    setHasForm(false);
  }, [selectedPost]);

  const handleCommentDelete = useCallback(
    (comment: Comment, index: number) => {
      dispatch({
        type: ActionType.DeleteComment,
        payload: comment.id,
      });
      dispatch({
        type: ActionType.SetErrorMessage,
        payload: ErrorMessage.NoError,
      });
      deleteComment(comment.id).catch(() => {
        dispatch({
          type: ActionType.SetErrorMessage,
          payload: ErrorMessage.DeletingComment,
        });
        dispatch({
          type: ActionType.RestoreComment,
          payload: { comment, index },
        });
      });
    },
    [dispatch],
  ); //error persists

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {(isLoading && <Loader />) ||
            (hasError && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )) ||
            (!comments.length ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map((comment, index) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    handleCommentDelete={() =>
                      handleCommentDelete(comment, index)
                    }
                  />
                ))}
              </>
            ))}

          {hasDeletingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!hasForm && !isLoading && !hasError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setHasForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {hasForm && <NewCommentForm selectedPostId={selectedPost.id} />}
      </div>
    </div>
  );
};
