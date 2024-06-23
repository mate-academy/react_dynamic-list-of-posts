import React, { useContext, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { InitialContext } from './ToDoContext';
import { deleteComment } from '../utils/sevicePosts';

export const PostDetails: React.FC = () => {
  const {
    comments,
    setComments,
    selectedPost,
    loadingComment,
    error,
    setErrorNotification,
  } = useContext(InitialContext);
  const [showNewComment, setShowNewComment] = useState(false);

  const handleDeleteButton = (idNumber: number) => {
    const updateComments = comments;

    const removeComment = updateComments.filter(
      comment => comment.id !== idNumber,
    );

    setComments(removeComment);

    deleteComment(idNumber)
      .then(() => {})
      .catch(() => {
        setErrorNotification('Unable to delete comment');
        setComments(updateComments);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {loadingComment && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && !loadingComment && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {comments.length > 0 && !loadingComment && (
            <p className="title is-4">Comments:</p>
          )}

          {comments.map(comment => (
            <article
              className="message is-small"
              data-cy="Comment"
              key={comment.id}
            >
              <div className="message-header">
                <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                  {comment.name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => handleDeleteButton(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}
          {!loadingComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowNewComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showNewComment && <NewCommentForm />}
      </div>
    </div>
  );
};
