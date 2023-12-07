import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post | null,
};

type Action = 'load' | 'delete';

export const PostDetails: React.FC<Props> = ({
  post,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNewComment, setIsNewComment] = useState(false);
  const [retryFunction, setRetryFunction] = useState<Action | null>(null);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);

  const loadComments = () => {
    setIsLoading(true);
    client.get<Comment[]>(`/comments?postId=${post?.id}`)
      .then((data) => {
        setComments(data);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
        setRetryFunction('load');
      })
      .finally(() => setIsLoading(false));
  };

  const deleteComment = (comment?: Comment) => {
    setIsLoading(true);
    const tempComment = comment || commentToDelete;

    if (tempComment) {
      client.delete(`/comments/${tempComment.id}`)
        .then(() => {
          setComments(
            prevComments => prevComments.filter(c => c.id !== tempComment.id),
          );
          setIsError(false);
        })
        .catch(() => {
          setIsError(true);
          setRetryFunction('delete');
        })
        .finally(() => {
          setIsLoading(false);
          setCommentToDelete(tempComment);
        });
    }
  };

  useEffect(() => {
    if (post) {
      loadComments();
    }
  }, [post]);

  const handleWriteComment = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setIsNewComment(true);
  };

  const handleDeleteComment = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    comment: Comment,
  ) => {
    event.preventDefault();
    deleteComment(comment);
  };

  const handleRetry = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    switch (retryFunction) {
      case 'load':
        loadComments();
        break;

      case 'delete':
        deleteComment();
        break;

      default:
        break;
    }
  };

  const handleRefresh = () => window.location.reload();

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {`${post?.body}`}
          </p>
        </div>

        <div className="block">
          {isLoading && (<Loader />)}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              <div className="level">
                <div className="level-left">
                  <p>Something went wrong</p>
                </div>
                <div className="level-right">
                  <button
                    type="button"
                    onClick={event => handleRetry(event)}
                    className="button has-background-danger has-text-white"
                    style={{ marginRight: '20px' }}
                  >
                    <span className="icon">
                      <i className="fas fa-redo-alt" />
                    </span>
                    <span>Retry</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="button has-background-danger has-text-white"
                    style={{ border: '1px solid white' }}
                  >
                    <span className="icon">
                      <i className="fas fa-sync-alt" />
                    </span>
                    <span>Refresh Page</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          {!isError && (!comments.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <p className="title is-4">Comments:</p>
          ))}

          {!isError && comments.map((comment) => {
            const {
              id, email, name, body,
            } = comment;

            return (
              <article
                className="message is-small"
                data-cy="Comment"
                key={id}
              >
                <div className="message-header">
                  <a href={`mailto:${email}`} data-cy="CommentAuthor">
                    {`${name}`}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={event => handleDeleteComment(event, comment)}
                  >
                    delete button
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {`${body}`}
                </div>
              </article>
            );
          })}

          {!isError && !isNewComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={event => handleWriteComment(event)}
            >
              Write a comment
            </button>
          )}
        </div>

        {!isError && isNewComment && (
          <NewCommentForm
            postId={post?.id}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
