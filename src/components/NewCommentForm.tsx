import classNames from 'classnames';
import React from 'react';
import { CommentData } from '../types/Comment';

interface Props {
  handleChange:
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  commentData: CommentData,
  isRequired: boolean,
  errorName: string[] | undefined,
  handleSubmit: (event: React.FormEvent) => void,
  handleClear: () => void,
  isPostingComment: boolean,
}

export const NewCommentForm: React.FC<Props> = ({
  handleChange,
  commentData,
  isRequired,
  errorName,
  handleSubmit,
  handleClear,
  isPostingComment,
}) => {
  const { name, email, body } = commentData;
  const nameError = errorName?.find(el => el === 'name');
  const emailError = errorName?.find(el => el === 'email');
  const bodyError = errorName?.find(el => el === 'body');

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input', { 'is-danger': isRequired && nameError },
            )}
            value={name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {(isRequired && nameError) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        {(isRequired && nameError) && (
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
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input', { 'is-danger': isRequired && emailError },
            )}
            value={email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(isRequired && emailError) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        {(isRequired && emailError) && (
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
            placeholder="Type comment here"
            className={classNames(
              'textarea', { 'is-danger': isRequired && bodyError },
            )}
            value={body}
            onChange={handleChange}
          />
        </div>

        {(isRequired && bodyError) && (
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
              'button is-link', { 'is-loading': isPostingComment },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
