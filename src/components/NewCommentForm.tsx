import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { CommentData } from '../types/Comment';
import { isFieldValid } from '../utils/helpers';

interface Props {
  submitComment: (data: CommentData) => void;
}

const initialFormState: CommentData = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  submitComment,
}) => {
  const [formState, setFormState] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isBodyValid, setIsBodyValid] = useState(true);

  const { name, email, body } = formState;

  const resetFieldsErrors = useCallback(() => {
    setIsNameValid(true);
    setIsEmailValid(true);
    setIsBodyValid(true);
  }, []);

  const submitForm = useCallback(async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setIsLoading(true);

    const isNameFieldValid = isFieldValid(name);
    const isEmailFieldValid = isFieldValid(email);
    const isBodyFieldValid = isFieldValid(body);

    setIsNameValid(isNameFieldValid);
    setIsEmailValid(isEmailFieldValid);
    setIsBodyValid(isBodyFieldValid);

    if (!isNameFieldValid || !isEmailFieldValid || !isBodyFieldValid) {
      setIsLoading(false);

      return;
    }

    await submitComment({ name, email, body });

    setFormState((currentFormState) => ({
      ...currentFormState,
      body: '',
    }));
    resetFieldsErrors();
    setIsLoading(false);
  }, [formState]);

  const handleNameFieldOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormState((currentFormState) => ({
      ...currentFormState,
      name: event.target.value,
    }));
    setIsNameValid(true);
  };

  const handleEmailFieldOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormState((currentFormState) => ({
      ...currentFormState,
      email: event.target.value,
    }));
    setIsEmailValid(true);
  };

  const handleBodyFieldOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormState((currentFormState) => ({
      ...currentFormState,
      body: event.target.value,
    }));
    setIsBodyValid(true);
  };

  const handleResetFieldsOnClick = () => {
    setFormState(initialFormState);
    resetFieldsErrors();
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={submitForm}>
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
            className={cn('input', {
              'is-danger': !isNameValid,
            })}
            value={name}
            onChange={handleNameFieldOnChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!isNameValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isNameValid && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': !isEmailValid,
            })}
            value={email}
            onChange={handleEmailFieldOnChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!isEmailValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isEmailValid && (
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
            className={cn('textarea', {
              'is-danger': !isBodyValid,
            })}
            value={body}
            onChange={handleBodyFieldOnChange}
          />
        </div>

        {!isBodyValid && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
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
            onClick={handleResetFieldsOnClick}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
