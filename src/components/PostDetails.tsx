import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { delComment } from '../api/Metods';
export const PostDetails: React.FC = ({
  writeComment,
  handleWriteComment,
  isLoading,
  selectPost,
  post,
  errorType,
  comments,
  setComments,
  setErrorType,
}) => {
  {
  }

  const handleDelete = (commentId: number) => {
    setComments(prev => {
      const updated = prev.filter(comment => comment.id !== commentId);

      if (updated.length === 0) {
        setErrorType('no-comments');
      }

      return updated;
    });

    delComment(commentId).catch(() => {});
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {selectPost && errorType === 'error-comments' && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {selectPost && errorType === 'no-comments' && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>

          {!isLoading &&
            comments.map(comment => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}

          {!isLoading && !writeComment && errorType !== 'error-comments' && (
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

        {writeComment && (
          <NewCommentForm
            setComments={setComments}
            postId={post.id}
            setErrorType={setErrorType}
          />
        )}
      </div>
    </div>
  );
};
