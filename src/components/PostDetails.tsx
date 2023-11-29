import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { GlobalContext } from './GeneralContext';
import { ErrorType } from '../types/ErrorType';
import * as commentsService from '../api/comments';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    isCommentsLoading,
    error,
    comments,
    setComments,
    isFormOpen,
    setIsFormOpen,
  } = useContext(GlobalContext);

  const handleDeleteComment = (commentId: number) => {
    commentsService.deleteComment(commentId)
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setComments(comments.filter(comment => comment.id !== commentId));
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {error === ErrorType.CommentsLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {selectedPost
          && !isCommentsLoading
          && error === ErrorType.None
          && (comments.length > 0
            ? (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map(comment => (
                  <article
                    key={comment.id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                        {comment.name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                ))}
              </>
            )
            : (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )
          )}

          {!isFormOpen && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpen && <NewCommentForm />}
      </div>
    </div>
  );
};
