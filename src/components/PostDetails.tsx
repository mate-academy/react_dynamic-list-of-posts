/* eslint-disable func-names */
import React, { useCallback, useEffect, useState } from 'react';
import { Comment, Post, Error } from '../types';
import { deleteComment, getComments } from '../utils/api';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post | null
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState(Error.None);

  const { id, title, body } = selectedPost || {};

  const isListVisible = comments.length > 0 && !isLoading;
  const isListEmpty = comments.length === 0 && !isLoading;
  const hasError = (error === Error.Add || error === Error.Delete);

  const updateComments = useCallback(
    (updatedComments: Comment[]) => {
      setComments(updatedComments);
    },
    [],
  );

  const handleAddError = useCallback(() => setError(Error.Add), []);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      (async function () {
        try {
          setComments(await getComments(id));
        } catch {
          setError(Error.Load);
        } finally {
          setIsLoading(false);
        }
      }());
    }
  }, [selectedPost]);

  const onDelete = (commentId: number) => async () => {
    const filteredComments = comments
      .filter(comment => comment.id !== commentId);

    deleteComment(commentId)
    // eslint-disable-next-line no-console
      .catch(() => setError(Error.Delete));
    setComments(filteredComments);
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

          {error === Error.Load && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {isListEmpty && (
            <p
              className="title is-4"
              data-cy="NoCommentsMessage"
            >
              No comments yet
            </p>
          )}

          {isListVisible && (
            <>
              <p className="title is-4">Comments:</p>

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
                      onClick={onDelete(comment.id)}
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

          {hasError && (
            <div
              className="notification is-danger"
              data-cy="PostsLoadingError"
            >
              {`Could not ${error === Error.Add
                ? 'add'
                : 'delete'} comment`}
            </div>
          )}

          {!isLoading && !isFormOpen && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpen && (
          <NewCommentForm
            postId={id || 0}
            setComments={updateComments}
            comments={comments}
            setError={handleAddError}
          />
        )}
      </div>
    </div>
  );
};
