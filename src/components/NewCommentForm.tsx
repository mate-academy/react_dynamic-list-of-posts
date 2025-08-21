import classNames from 'classnames';
import React from 'react';

type Props = {
  name: string;
  email: string;
  text: string;
  isSubmitted: boolean;
  isLoading: boolean;
  selectedUserId: number;
  onHandleName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleText: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onHandleReset: () => void;
  onHandleForm: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  name,
  email,
  text,
  isSubmitted,
  isLoading,
  onHandleName,
  onHandleEmail,
  onHandleText,
  onHandleReset,
  onHandleForm,
}) => {
  return (
    <form data-cy="NewCommentForm" onSubmit={onHandleForm}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': name.trim() === '' && isSubmitted,
            })}
            onChange={onHandleName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {name.trim() === '' && isSubmitted && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {name.trim() === '' && isSubmitted && (
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
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': email.trim() === '' && isSubmitted,
            })}
            onChange={onHandleEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {email.trim() === '' && isSubmitted && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {email.trim() === '' && isSubmitted && (
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
            value={text}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': text.trim() === '' && isSubmitted,
            })}
            onChange={onHandleText}
          />
        </div>

        {text.trim() === '' && isSubmitted && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isLoading,
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
            onClick={onHandleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
