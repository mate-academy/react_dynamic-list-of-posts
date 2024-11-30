import React, { useContext } from 'react';
import {
  ActivePostContext,
  CommentFormContext,
  ErrorsContext,
  LoaderContext,
} from '../../../utils/Store';
import { Loader } from '../../Loader';
import { ErrorTypes } from '../../../types/ErrorTypes';
import { CommentItem } from './CommentItem';
import { Comment } from '../../../types/Comment';

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const { activePost } = useContext(ActivePostContext);
  const { isLoading } = useContext(LoaderContext);
  const { isError } = useContext(ErrorsContext);
  const { isActiveForm, setIsActiveForm } = useContext(CommentFormContext);

  return (
    <div className="block">
      {isError === ErrorTypes.Comment ? (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      ) : (
        <>
          {isLoading && activePost ? (
            <Loader />
          ) : comments.length === 0 && !isLoading && !isError ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {comments?.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </>
          )}
        </>
      )}

      {!isLoading && !isActiveForm && !isError && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => setIsActiveForm(true)}
        >
          Write a comment
        </button>
      )}
    </div>
  );
};
