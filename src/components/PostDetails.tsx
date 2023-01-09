import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  currentPost: Post | null,
  hasCommentForm: boolean,
  setHasCommentForm: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PostDetails: React.FC<Props> = ({
  currentPost,
  hasCommentForm,
  setHasCommentForm,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasComments, setHasComments] = useState(false);
  const handleClickWriteButton = () => {
    setHasCommentForm(true);
  };

  const handleError = () => {
    setTimeout(() => setHasError(false), 3000);
    setHasError(true);
  };

  useEffect(() => {
    if (currentPost) {
      setIsLoading(true);
      setHasComments(false);

      client.get<Comment[]>(`/comments?postId=${currentPost.id}`)
        .then(response => {
          setIsLoading(false);

          if (!response.length) {
            setHasComments(true);
          }

          setComments(response);
        })
        .catch(handleError);
    }
  }, [currentPost]);

  if (!currentPost) {
    return null;
  }

  const handleClickDelete = (commentItem: Comment) => {
    setComments(currentComments => {
      return currentComments.filter(comment => comment.id !== commentItem.id);
    });

    client.delete(`/comments/${commentItem.id}`)
      .catch(() => {
        handleError();
        setTimeout(() => setComments((currentComments) => [
          ...currentComments,
          commentItem,
        ]), 3000);
      });
  };

  const { id, title, body } = currentPost;
  const isTitle = !!comments.length && !isLoading;
  const isWriteCommentButton = !isLoading && !hasCommentForm;

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
          {isLoading && (<Loader />)}
          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {hasComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isTitle && (
            <p className="title is-4">
              Comments:
            </p>
          )}

          {!isLoading && comments.map(comment => (
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
                  onClick={() => handleClickDelete(comment)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {isWriteCommentButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleClickWriteButton}
            >
              Write a comment
            </button>
          )}
        </div>

        {hasCommentForm && (
          <NewCommentForm
            postId={currentPost.id}
            setComments={setComments}
            handleError={handleError}
          />
        )}
      </div>
    </div>
  );
};
