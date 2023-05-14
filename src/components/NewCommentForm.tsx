import React, {
  ChangeEvent,
  FormEvent,
} from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';
import { FieldErrors } from '../types/Errors';

interface Props {
  onCommentData: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onAddComment: (event: FormEvent<HTMLButtonElement>) => void
  onClearForm: () => void
  newComment: CommentData
  isLoading: boolean
  fieldErrors: FieldErrors
}

export const NewCommentForm: React.FC<Props> = ({
  onCommentData,
  onClearForm,
  onAddComment,
  newComment,
  isLoading,
  fieldErrors,
}) => {
  const { name, email, body } = fieldErrors;

  return (
    <form data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            value={newComment?.name}
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': name })}
            onChange={(event) => {
              onCommentData(event);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {name && (
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
            type="text"
            name="email"
            value={newComment?.email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': email })}
            onChange={(event) => onCommentData(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {email && (
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
            id="comment-body"
            name="body"
            value={newComment?.body}
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': body })}
            onChange={(event) => onCommentData(event)}
          />
        </div>

        {body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button', 'is-link', { 'is-loading': isLoading },
            )}
            onClick={onAddComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={onClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
