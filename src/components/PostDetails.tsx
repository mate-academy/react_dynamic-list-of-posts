import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { AppContext } from './AppContext';
import { removeComment } from '../api/comments';

export const PostDetails: React.FC = () => {
  const {
    comments, setComments, loadingComments, selectedPost, commentsErrorMessage,
    writeNewComment, setWriteNewComment,
  } = useContext(AppContext);

  const handleWriteCommentClick = () => {
    setWriteNewComment(true);
  };

  const handleDeleteCommentClick = (commentId: any) => {
    setComments(current => current.filter(comment => comment.id !== commentId));

    return removeComment(commentId)
      .catch(error => {
        setComments(comments);
        throw error;
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
          {loadingComments && (
            <Loader />
          )}

          {!loadingComments && commentsErrorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0
            && !commentsErrorMessage
            && !loadingComments
            && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

          {!loadingComments
            && !commentsErrorMessage
            && comments.length > 0
            && (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={comment.name}
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
                        onClick={() => handleDeleteCommentClick(comment?.id)}
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
          {!commentsErrorMessage
          && !loadingComments
          && !writeNewComment
          && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleWriteCommentClick}
            >
              Write a comment
            </button>
          )}
        </div>
        {writeNewComment && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
