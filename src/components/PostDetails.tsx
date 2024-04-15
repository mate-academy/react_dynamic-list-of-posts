import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { usePostInfo } from '../utils/PostContext';
import * as commentServices from '../api/comments';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    comments,
    setComments,
    isCommentsLoading,
    setIsCommentsLoading,
    commentsError,
    setCommentsError,
    newCommentFormOpen,
    setNewCommentFormOpen,
  } = usePostInfo();

  const handleDeleteComment = async (id: number) => {
    setCommentsError(false);
    setIsCommentsLoading(true);
    try {
      await commentServices.deleteComment(id);
      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== id),
      );
    } catch (error) {
      setCommentsError(true);
      setComments(comments);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  const handleWriteComment = () => {
    setNewCommentFormOpen(true);
    setCommentsError(false);
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

        {commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isCommentsLoading && !commentsError && !comments.length && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!commentsError && !!comments.length && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => {
              const { id, name, email, body } = comment;

              return (
                <article
                  key={id}
                  className="message is-small"
                  data-cy="Comment"
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

        {!isCommentsLoading && !commentsError && !newCommentFormOpen && (
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

      {newCommentFormOpen && <NewCommentForm />}
    </div>
  );
};
