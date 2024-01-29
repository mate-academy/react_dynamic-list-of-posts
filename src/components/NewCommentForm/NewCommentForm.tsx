import classNames from 'classnames';
import React, { ChangeEvent, FormEvent, useState } from 'react';

type Input = {
  name: string,
  email: string,
  body: string,
};

export const NewCommentForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState(false);

  const [isValid, setIsValid] = useState(true);
  const [startValidation, setStartValidation] = useState(false);

  const { register } = useForm<Input>();

  function validation(): boolean {
    setNameError(!name);
    setEmailError(!email);
    setBodyError(!body);

    if (!name || !body || !email) {
      setIsValid(false);

      return false;
    }

    setIsValid(true);

    return true;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStartValidation(true);

    if (!validation()) {
      return;
    }

    setIsLoading(true);
  }

  function reset() {
    setName('');
    setNameError(false);
    setEmail('');
    setEmailError(false);
    setBody('');
    setBodyError(false);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    setNameError(false);

    if (startValidation) {
      validation();
    }
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    setEmailError(!email);

    if (startValidation) {
      validation();
    }
  }

  function handleBodyChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setBody(event.target.value);
    setBodyError(!body);

    if (startValidation) {
      validation();
    }
  }

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            minLength={3}
            type="text"
            {...register('name')}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': nameError,
            })}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className={classNames('icon is-small is-right', {
                'has-text-danger': nameError,
              })}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
            {...register('email')}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': emailError,
            })}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
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
            {...register('body')}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': bodyError,
            })}
            value={body}
            onChange={handleBodyChange}
          />
        </div>

        {bodyError && (
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
            disabled={!isValid}
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
