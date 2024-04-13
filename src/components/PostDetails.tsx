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
    errCommentsLoading,
    errHandleComment,
    setErrHandleComment,
    newCommentFormOpen,
    setIsCommentsLoading,
    setNewCommentFormOpen,
  } = usePostInfo();

  const handleDeleteComment = async (id: number) => {
    setErrHandleComment(false);
    setIsCommentsLoading(true);
    try {
      await commentServices.deleteComment(id);
      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== id),
      );
    } catch (error) {
      setErrHandleComment(true);
      setComments(comments);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  const handleWriteComment = () => {
    setNewCommentFormOpen(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {errCommentsLoading || errHandleComment && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!errCommentsLoading && !comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!errCommentsLoading && !!comments.length && (
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
          )}

          {!errCommentsLoading && !newCommentFormOpen && (
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
    </div>
  );
};
