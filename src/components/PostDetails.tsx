import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { deleteComment, getComments, addComment } from '../api';
import { ErrorTypes } from '../types/ErrorAction';
import { NotificationError } from './NotificationError';

type Props = {
  selectPost:Post;
};

export const PostDetails: React.FC<Props> = ({ selectPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<ErrorTypes | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id, title, body } = selectPost;

  useEffect(() => {
    setIsLoading(true);
    setIsOpen(false);
    setComments([]);
    getComments(id)
      .then(result => {
        setComments(result);
      })
      .catch(() => {
        setErrorType(ErrorTypes.COMMENTS);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectPost]);

  const handleDeleteComent = (commentId:number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    deleteComment(commentId)
      .catch(() => {
        setComments([...comments]);
        setErrorType(ErrorTypes.DELETE);
      });
  };

  const handleOpenNewForm = () => {
    setIsOpen(true);
  };

  const handleAddComment = (data: CommentData) => {
    setIsLoading(true);
    addComment(data)
      .then(result => {
        setComments(prev => {
          return [
            ...prev,
            result,
          ];
        });
      })
      .catch(() => {
        setErrorType(ErrorTypes.ADD);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}
          {!isLoading && (
            <>
              {comments.length > 0 || errorType ? (
                <p className="title is-4">Comments:</p>
              ) : (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}
            </>
          )}

          {errorType === ErrorTypes.COMMENTS && (
            <NotificationError
              errorMessage={ErrorTypes.COMMENTS.toString()}
              labelData="CommentsError"
            />
          )}

          {comments.map(comment => {
            const { email, name } = comment;

            return (
              <article
                className="message is-small"
                data-cy="Comment"
                key={comment.id}
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
                    onClick={() => handleDeleteComent(comment.id)}
                  >
                    delete button
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            );
          })}
          {(!isOpen && !isLoading && !errorType) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleOpenNewForm}
            >
              Write a comment
            </button>
          )}
        </div>
        {errorType === ErrorTypes.DELETE && (
          <div
            className="notification is-danger"
            data-cy="PostsLoadingError"
          >
            {errorType}
          </div>
        )}
        {isOpen && (
          <NewCommentForm
            handleAddComment={handleAddComment}
            postId={selectPost.id}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};
