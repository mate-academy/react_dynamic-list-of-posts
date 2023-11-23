import React from 'react';
import classNames from 'classnames';
import { Fields } from '../types/Fields';
import { CommentData, CommentError } from '../types/Comment';

type Props = {
  onAddComment: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmit: boolean;
  newComment: CommentData | null;
  handleChangeField: (value: string, field: keyof typeof Fields) => void;
  commentError: CommentError | null;
  reset: () => void;
};

export const NewCommentForm: React.FC<Props> = ({
  onAddComment,
  isSubmit,
  newComment,
  handleChangeField,
  commentError,
  reset,
}) => {
  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={onAddComment}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={newComment?.name}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': commentError?.errorName,
            })}
            onChange={(event) => {
              handleChangeField(event.target.value, Fields.Name);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {commentError?.errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {commentError?.errorName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={newComment?.email}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': commentError?.errorEmail,
            })}
            onChange={(event) => {
              handleChangeField(event.target.value, Fields.Email);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {commentError?.errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {commentError?.errorEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            value={newComment?.body || ''}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': commentError?.errorBody,
            })}
            onChange={(event) => {
              handleChangeField(event.target.value, Fields.Body);
            }}
          />
        </div>

        {commentError?.errorBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isSubmit,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
