import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types';

type Props = {
  onAdd: (comment: CommentData) => Promise<void>,
};

export const NewCommentForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasBodyError, setHasBodyError] = useState(false);

  const handleFailedSubmit = () => {
    setHasNameError(!name);
    setHasEmailError(!email);
    setHasBodyError(!body);
  };

  const clearErrors = () => {
    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  const handleSuccessfulSubmit = () => {
    setBody('');
    clearErrors();
  };

  const clearForm = () => {
    clearErrors();
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name || !email || !body) {
      handleFailedSubmit();

      return;
    }

    const newCommentData = {
      name,
      email,
      body,
    };

    setIsButtonDisabled(true);
    onAdd(newCommentData)
      .then(() => handleSuccessfulSubmit())
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

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
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input',
              { 'is-danger': hasNameError },
            )}
            value={name}
            onChange={({ target }) => {
              setName(target.value);
              setHasNameError(false);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasNameError && (
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
              'input',
              { 'is-danger': hasEmailError },
            )}
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
              setHasEmailError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailError && (
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
              'textarea',
              { 'is-danger': hasNameError },
            )}
            value={body}
            onChange={({ target }) => {
              setBody(target.value);
              setHasBodyError(false);
            }}
          />
        </div>

        {hasBodyError && (
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
              'button is-link',
              { 'is-loading': isButtonDisabled },
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
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
