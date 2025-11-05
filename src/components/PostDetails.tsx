import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useComments } from '../hooks/UseComments';
import classNames from 'classnames';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const {
    comments,
    isLoading,
    hasError,
    createComment,
    deleteComment,
    failedDeleteIds,
    clearDeleteError,
  } = useComments(selectedPost?.id ?? null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setIsFormOpen(false);
  }, [selectedPost?.id]);

  if (!selectedPost) {
    return null;
  }

  const isOk = !isLoading && !hasError;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isOk && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isOk && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => {
                const failedToDelete = failedDeleteIds.has(comment.id);

                return (
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
                        onClick={() => deleteComment(comment.id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                      {failedToDelete && (
                        <div
                          className={classNames(
                            'notification',
                            'is-danger',
                            'is-light',
                            'mt-2',
                            'p-2',
                          )}
                        >
                          Failed to delete.
                          <button
                            type="button"
                            className="button is-small is-success is-light ml-2"
                            onClick={() => deleteComment(comment.id)}
                          >
                            Retry
                          </button>
                          <button
                            type="button"
                            className="button is-small is-danger ml-2"
                            onClick={() => clearDeleteError(comment.id)}
                          >
                            Dismiss
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </>
          )}

          {!isFormOpen && isOk && (
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

        {isFormOpen && isOk && (
          <NewCommentForm
            postId={selectedPost.id}
            onCreate={data => createComment(data)}
          />
        )}
      </div>
    </div>
  );
};
