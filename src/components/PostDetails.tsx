import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Notification } from './Notification';

import { ErrorType } from '../types/ErrorType';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

import { deleteComment, getPostComments } from '../api/comments';

type Props = {
  errorType: ErrorType;
  setErrorType: (errorType: ErrorType) => void;
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({
  errorType,
  setErrorType,
  selectedPost,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);

  const { id, title, body } = selectedPost;

  const handleLoadComments = async () => {
    try {
      setIsError(false);
      setComments([]);
      setIsLoading(true);

      const commentsFromServer = await getPostComments(id);

      setComments(commentsFromServer);
    } catch {
      setIsError(true);
      setErrorType(ErrorType.onCommentsLoad);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFormIsOpen(false);
    handleLoadComments();
  }, [selectedPost]);

  const handleDeleteComment = async (commentId: number) => {
    setComments(comments
      .filter(comment => comment.id !== commentId));

    try {
      await deleteComment(commentId);
    } catch {
      setFormIsOpen(false);
      setIsError(true);
      setErrorType(ErrorType.onCommentsLoad);
    }
  };

  const handleOpenForm = () => {
    setFormIsOpen(true);
  };

  const handleReload = () => {
    handleLoadComments();
  };

  return (
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

        {isError
          ? (
            <>
              <Notification errorType={errorType} />

              <button
                type="button"
                className="button is-link"
                onClick={handleReload}
              >
                Try again
              </button>
            </>
          )
          : (
            <>
              {!isLoading && !comments.length && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {!!comments.length && (
                <p className="title is-4">Comments:</p>
              )}

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

              {!isLoading && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={handleOpenForm}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
      </div>
      {formIsOpen && (
        <NewCommentForm
          postId={id}
          onSetErrorType={setErrorType}
          onSetFromIsOpen={setFormIsOpen}
          onSetIsError={setIsError}
          onSetComments={setComments}
        />
      )}
    </div>
  );
};
