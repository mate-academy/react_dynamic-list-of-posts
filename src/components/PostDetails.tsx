import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { usePostContext } from '../utils/PostContext';
import * as commentServices from './api/comments';

export const PostDetails: React.FC = () => {
  const {
    comments,
    selectedPost,
    isCommentsError,
    isCommentsLoading,
    isNewCommentFormOpen,
    setComments,
    setIsCommentsLoading,
    setIsCommentsError,
    setIsNewCommentFormOpen,
  } = usePostContext();

  const handleDeleteComment = async (id: number) => {
    setIsCommentsError(false);
    setIsCommentsLoading(true);
    try {
      await commentServices.deleteComments(id);
      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== id),
      );
    } catch (error) {
      setIsCommentsError(true);
      setComments(comments);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  const handleWriteComment = () => {
    setIsNewCommentFormOpen(true);
    setIsCommentsError(false);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {isCommentsLoading && <Loader />}

        {isCommentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isCommentsLoading && !isCommentsError && !comments.length && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isCommentsError && !!comments.length && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => {
              const { id, name, email, body } = comment;

              return (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={id}
                >
                  <div className="message-header">
                    <a href={`mailto:${email}`} data-cy="CommentAuthor">
                      {name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeleteComment(id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {body}
                  </div>
                </article>
              );
            })}
          </>
        )}

        {!isCommentsLoading && !isCommentsError && !isNewCommentFormOpen && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handleWriteComment}
          >
            Write a comment
          </button>
        )}
      </div>

      {isNewCommentFormOpen && <NewCommentForm />}
    </div>
  );
};
