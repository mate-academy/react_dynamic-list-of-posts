import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { UserContext } from '../UserContext/UserContext';
import { CommentItem } from '../CommentItem/CommentItem';
import { Errors } from '../../types/Errors';

export const PostDetails: React.FC = () => {
  const {
    choosedPost,
    comments,
    error,
    isLoading,
    isActiveComForm,
    setIsActiveComForm,
  } = useContext(UserContext);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${choosedPost?.id}: ${choosedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {choosedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoading && !comments && (<Loader />)}

          {error === Errors.COMMENT && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments && comments.length === 0 && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments && comments.length > 0 && !error && (
            <p className="title is-4">Comments:</p>
          )}

          {!error && comments?.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
            />
          ))}

          {!isActiveComForm && !isLoading && !error && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsActiveComForm(true)}
            >
              Write a comment
            </button>
          )}

          {isActiveComForm && !error && (
            <NewCommentForm />
          )}
        </div>

      </div>
    </div>
  );
};
