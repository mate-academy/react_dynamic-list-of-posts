import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';

type Props = {
  addComment: (name: string, email: string, body: string) => Promise<void>;
};

const getTrimmedValue = (value: string): string => {
  return value.trim();
};

const isTrimmedInputEmpty = (value: string): boolean => {
  return getTrimmedValue(value) === '';
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(getTrimmedValue(email));
};

export const NewCommentForm: React.FC<Props> = ({ addComment }) => {
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isBodyError, setIsBodyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bodyText, setBodyText] = useState('');

  const clearInputs = () => {
    setName('');
    setEmail('');
    setBodyText('');
  };

  const clearErrors = () => {
    setIsNameError(false);
    setIsEmailError(false);
    setIsBodyError(false);
  };

  const handleSubmitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasValidationErrors = false;

    if (isTrimmedInputEmpty(name)) {
      setIsNameError(true);
      hasValidationErrors = true;
    }

    if (isTrimmedInputEmpty(email) || !isValidEmail(email)) {
      setIsEmailError(true);
      hasValidationErrors = true;
    }

    if (isTrimmedInputEmpty(bodyText)) {
      setIsBodyError(true);
      hasValidationErrors = true;
    }

    if (hasValidationErrors) {
      return;
    }

    setIsLoading(true);

    addComment(name, email, bodyText)
      .then(() => {
        setBodyText('');
        clearErrors();
      })
      .finally(() => setIsLoading(false));
  };

  const handleClearForm = () => {
    clearInputs();
    clearErrors();
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitComment}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            value={name}
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': isNameError })}
            onChange={event => setName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            className={classNames('input', { 'is-danger': isEmailError })}
            onChange={event => setEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
            value={bodyText}
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': isBodyError })}
            onChange={event => setBodyText(event.target.value)}
          />
        </div>

        {isBodyError && (
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
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
