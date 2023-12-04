import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { ErrorMessage } from '../types/ErrorMessage';
import { deleteComment } from '../api/comments';

interface Props {
  selectedPost: Post,
  comments: Comment[],
  errorMessage: ErrorMessage | null,
  commentLoader: boolean,
  onSetComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  onSetErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessage | null>>,
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  errorMessage,
  commentLoader,
  onSetComments,
  onSetErrorMessage,
}) => {
  const [isAddFormShown, setIsAddFormShown] = useState(false);
  const isCommentsListEmpty = !comments.length && !errorMessage
    && !commentLoader;
  const isCommentsListVisible = !!comments.length && !commentLoader
    && !errorMessage;
  const isButtonVisible = !errorMessage && !commentLoader && !isAddFormShown;
  const isFormVisible = !errorMessage && !commentLoader && isAddFormShown;

  const handleCommentDelete = (commentId: number) => {
    onSetComments(prevState => prevState.filter(c => c.id !== commentId));

    deleteComment(commentId)
      .catch(() => {
        onSetErrorMessage(ErrorMessage.DELETE_COMMENT_ERROR);
      });
  };

  useEffect(() => {
    setIsAddFormShown(false);
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <div className="block">
          {commentLoader && (
            <Loader />
          )}

          {errorMessage === ErrorMessage.GET_COMMENTS_ERROR && (
            <div className="notification is-danger" data-cy="CommentsError">
              {ErrorMessage.GET_COMMENTS_ERROR}
            </div>
          )}

          {isCommentsListEmpty && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isCommentsListVisible && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
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
                      onClick={() => {
                        handleCommentDelete(comment.id);
                      }}
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

          {isButtonVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                setIsAddFormShown(true);
              }}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && (
          <NewCommentForm
            selectedPostId={selectedPost.id}
            onSetComments={onSetComments}
            onSetErrorMessage={onSetErrorMessage}
          />
        )}
      </div>
    </div>
  );
};
