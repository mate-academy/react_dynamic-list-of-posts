/* eslint-disable func-names */
import React, { useCallback, useEffect, useState } from 'react';
import { Comment, Post, IError } from '../types';
import { deleteComment, getComments } from '../utils/api';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post | null
  isFormOpen: boolean
  openForm: () => void
  isLoading: boolean
  setIsLoading: (param: boolean) => void
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isFormOpen,
  openForm,
  isLoading,
  setIsLoading,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(IError.None);
  const savedComments = comments;

  const { id, title, body } = selectedPost || {};
  const hasError = (error === IError.Add || error === IError.Delete);

  const updateComments = useCallback(
    (updatedComments: Comment[]) => {
      setComments(updatedComments);
    },
    [],
  );

  const handleError = useCallback((err: IError) => setError(err), []);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      (async function () {
        const commentsFromServer = await getComments(id);

        try {
          if (!commentsFromServer) {
            throw new Error();
          } else {
            setComments(commentsFromServer);
          }
        } catch {
          setError(IError.Load);
        } finally {
          setIsLoading(false);
        }
      }());
    }
  }, [selectedPost]);

  useEffect(() => {
    setError(IError.None);
  }, [comments]);

  const onDelete = (commentId: number) => async () => {
    const filteredComments = comments
      .filter(comment => comment.id !== commentId);

    setError(IError.None);
    setComments(filteredComments);

    try {
      await deleteComment(commentId);
    } catch {
      setComments(savedComments);
      setError(IError.Delete);
    }
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

          {error === IError.Load && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {!isLoading && (
            comments.length === 0
              ? (
                <p
                  className="title is-4"
                  data-cy="NoCommentsMessage"
                >
                  No comments yet
                </p>
              )
              : (
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
              ))}

          {hasError && (
            <div className="notification is-danger">
              {`Could not ${error === IError.Add
                ? 'add'
                : 'delete'} comment`}
            </div>
          )}

          {!isLoading && !isFormOpen && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={openForm}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpen && !isLoading && (
          <NewCommentForm
            postId={id as number}
            setComments={updateComments}
            comments={comments}
            setError={handleError}
          />
        )}
      </div>
    </div>
  );
};
