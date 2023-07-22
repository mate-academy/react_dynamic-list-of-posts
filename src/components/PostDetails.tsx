import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { deleteComment, getPostComments } from '../api/users';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';
import { ErrorMessage } from '../types/Error';

interface Props {
  setErrorType: (error: ErrorMessage) => void,
  selectedPost: Post,
  errorType: ErrorMessage,
}

export const PostDetails: React.FC<Props> = ({
  setErrorType,
  selectedPost,
  errorType,
}) => {
  const [isLoading, setIsLoaling] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isError, setIsError] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const { id, title, body } = selectedPost;

  const hendleLoadComents = async () => {
    setComments([]);
    setIsError(false);
    setIsLoaling(true);
    try {
      const commentsFromServer = await getPostComments(id);

      setComments(commentsFromServer);

      if (!commentsFromServer.length) {
        setErrorType(ErrorMessage.UserPosts);
      }
    } catch {
      setErrorType(ErrorMessage.UserPosts);
      setIsError(true);
    } finally {
      setIsLoaling(false);
    }
  };

  useEffect(() => {
    hendleLoadComents();
  }, [selectedPost]);

  const handleDeleteComment = async (commentId: number) => {
    setComments(comments
      .filter(comment => comment.id !== commentId));

    try {
      await deleteComment(commentId);
    } catch {
      setFormIsOpen(false);
      setIsError(true);
      setErrorType(ErrorMessage.Delete);
    }
  };

  const handleOpenForm = () => {
    setFormIsOpen(true);
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
          {isError}
          {isLoading && <Loader />}

          {!errorType && !comments.length && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorType}
            </div>
          )}

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
                <a
                  href={`mailto:${comment.email}`}
                  data-cy="CommentAuthor"
                >
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
          {(!formIsOpen && !isLoading) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleOpenForm}
            >
              Write a comment
            </button>
          )}

        </div>

        {formIsOpen && (
          <NewCommentForm
            selectedPost={selectedPost}
            postComments={comments}
            setPostComments={setComments}
            setError={setErrorType}

          />
        )}
      </div>
    </div>
  );
};
