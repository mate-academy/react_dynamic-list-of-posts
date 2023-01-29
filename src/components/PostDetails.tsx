import React, { Dispatch, SetStateAction } from 'react';
import '../stylesExtra/extraErrors.scss';

import { Loader } from './Loader';

import { ServerErrors } from '../types/enums/Errors';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  activePost: Post | null,
  comments: Comment[],
  error: ServerErrors | null,
  AreCommentsLoading: boolean,
  isFormRequested: boolean
  isRetryLoading: boolean,
  onFormRequest: Dispatch<SetStateAction<boolean>>,
  onDelete: (id: number) => void,
  onRetry: () => void,
  setError: Dispatch<SetStateAction<ServerErrors | null>>,
};

export const PostDetails: React.FC<Props> = ({
  activePost,
  comments,
  AreCommentsLoading,
  error,
  isFormRequested,
  isRetryLoading,
  onFormRequest,
  onDelete,
  onRetry,
  setError,
}) => {
  const { id, title } = activePost as Post;
  const successfulLoad = !AreCommentsLoading && !error;

  return (
    <>
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${id}: ${title}`}
        </h2>

        <p data-cy="PostBody">{activePost?.body}</p>
      </div>

      <div className="block">
        {AreCommentsLoading && <Loader /> }

        {error && (
          <div
            className="notification is-danger"
            data-cy="CommentsError"
          >
            {error}

            {error !== ServerErrors.Comments && (
              <button
                type="button"
                className="button button-retry"
                onClick={onRetry}
              >
                Try again
              </button>
            )}

            <button
              type="button"
              className="delete is-small"
              aria-label="delete"
              onClick={() => setError(null)}
            >
              delete button
            </button>
          </div>
        )}

        {isRetryLoading && <Loader />}

        {successfulLoad && (
          !comments.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(commentator => {
                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={commentator.id}
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${commentator.email}`}
                        data-cy="CommentAuthor"
                      >
                        {commentator.name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => onDelete(commentator.id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {commentator.body}
                    </div>
                  </article>
                );
              })}
            </>
          )
        )}

        {(successfulLoad && !isFormRequested) && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => onFormRequest(true)}
          >
            Write a comment
          </button>
        )}
      </div>
    </>
  );
};
