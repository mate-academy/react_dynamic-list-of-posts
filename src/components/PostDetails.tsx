/* eslint-disable no-console */
import React, { Dispatch, SetStateAction } from 'react';
import { Comment } from '../types/Comment';
import { Errors } from '../types/enums/Errors';
import { FormField } from '../types/FormField';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import '../stylesExtra/extraErrors.scss';

type Props = {
  activePost: Post | null,
  comments: Comment[],
  AreCommentsLoading: boolean,
  errorComments: Errors | null,
  isFormRequested: boolean
  name: FormField,
  email: FormField,
  body: FormField,
  isFormLoading: boolean,
  isRetryLoading: boolean,
  onFormRequest: Dispatch<SetStateAction<boolean>>,
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
  onFormSubmit: (event: React.FormEvent) => void
  onReset: (event: React.FormEvent) => void
  onDelete: (id: number) => void,
  onRetry: () => void,
  onCommentHide: () => void,
};

export const PostDetails: React.FC<Props> = ({
  activePost,
  comments,
  AreCommentsLoading,
  errorComments,
  isFormRequested,
  name,
  email,
  body,
  isFormLoading,
  isRetryLoading,
  onFormRequest,
  onNameChange,
  onTextAreaChange,
  onFormSubmit,
  onReset,
  onDelete,
  onRetry,
  onCommentHide,
}) => {
  const { id, title } = activePost as Post;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">{activePost?.body}</p>
        </div>

        <div className="block">
          {(AreCommentsLoading) && <Loader /> }

          {errorComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorComments}
              <button
                type="button"
                className="button button-retry"
                onClick={onRetry}
              >
                Try again
              </button>

              <button
                type="button"
                className="delete is-small"
                aria-label="delete"
                onClick={onCommentHide}
              >
                delete button
              </button>
            </div>
          )}

          {isRetryLoading && <Loader />}

          {!AreCommentsLoading && (
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

          {(!AreCommentsLoading && !isFormRequested) && (
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

        {isFormRequested && (
          <NewCommentForm
            name={name}
            email={email}
            body={body}
            isFormLoading={isFormLoading}
            onNameChange={onNameChange}
            onTextAreaChange={onTextAreaChange}
            onFormSubmit={onFormSubmit}
            onReset={onReset}
          />
        )}
      </div>
    </div>
  );
};
