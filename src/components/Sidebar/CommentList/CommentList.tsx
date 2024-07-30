import React, { useContext } from 'react';
//import { CommentItem } from './CommentItem';
import {
  ActivePostContext,
  CommentFormContext,
  ErrorsContext,
  LoaderContext,
} from '../../../utils/Store';
import { Loader } from '../../Loader';
import { ErrorTypes } from '../../../types/types';
import { Comment } from '../../../types/Comment';
import { CommentItem } from './CommentItem';

interface CommentListProp {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProp> = ({ comments }) => {
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

              {comments?.map(item => (
                <CommentItem key={item.id} comment={item} />
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
