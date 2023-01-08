import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  sendNewComment: (data: CommentData) => void,
  isFormSubmiting: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  sendNewComment, isFormSubmiting,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasBodyError, setHasBodyError] = useState(false);

  const submitNewCommentForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      setHasNameError(true);
    }

    if (!email) {
      setHasEmailError(true);
    }

    if (!body) {
      setHasBodyError(true);
    }

    if (!name || !email || !body) {
      return;
    }

    sendNewComment({ name, email, body });
    setBody('');
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');

    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  const handleInput = (inputName: string, value: string) => {
    switch (inputName) {
      case 'name':
        setName(value);
        setHasNameError(false);
        break;

      case 'email':
        setEmail(value);
        setHasEmailError(false);
        break;

      case 'body':
        setBody(value);
        setHasBodyError(false);
        break;

      default:
        break;
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={submitNewCommentForm}
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
            onChange={e => handleInput('name', e.target.value)}
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
            onChange={e => handleInput('email', e.target.value)}
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
              { 'is-danger': hasBodyError },
            )}
            value={body}
            onChange={e => handleInput('body', e.target.value)}
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
              { 'is-loading': isFormSubmiting },
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
