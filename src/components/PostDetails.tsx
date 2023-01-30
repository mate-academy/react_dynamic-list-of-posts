import React, { Dispatch, SetStateAction } from 'react';
import '../stylesExtra/extra.scss';

import { Loader } from './Loader';

import { ServerErrors } from '../types/enums/Errors';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  activePost: Post | null,
  comments: Comment[],
  error: ServerErrors | null,
  areCommentsLoading: boolean,
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
  areCommentsLoading,
  error,
  isFormRequested,
  isRetryLoading,
  onFormRequest,
  onDelete,
  onRetry,
  setError,
}) => {
  const { id, title, body } = activePost as Post;
  const successfulLoad = !areCommentsLoading && !error;

  return (
    <>
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${id}: ${title}`}
        </h2>

        <p data-cy="PostBody">{body}</p>
      </div>

      <div className="block">
        {areCommentsLoading && <Loader /> }

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

              <ul id="comment-list">
                {comments.map(commentator => {
                  const {
                    id: CommentatorId,
                    email: CommentatorEmail,
                    name: CommentatorName,
                    body: CommentatorBody,
                  } = commentator;

                  return (
                    <li
                      key={CommentatorId}
                      className="message is-small"
                      data-cy="Comment"
                    >
                      <div className="message-header">
                        <a
                          href={`mailto:${CommentatorEmail}`}
                          data-cy="CommentAuthor"
                        >
                          {CommentatorName}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={() => onDelete(CommentatorId)}
                        >
                          delete button
                        </button>
                      </div>
                      <div className="message-body" data-cy="CommentBody">
                        {CommentatorBody}
                      </div>
                    </li>
                  );
                })}
              </ul>
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
