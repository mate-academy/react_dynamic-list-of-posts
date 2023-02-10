import React, { FormEvent, useState, useCallback } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type PropsTypes = {
  addComment: (comment: CommentData) => Promise<void>,
  isInputUpdating: boolean
};

export const NewCommentForm: React.FC<PropsTypes> = ({
  addComment,
  isInputUpdating,
}) => {
  const [name, setNameValue] = useState('');
  const [email, setEmailValue] = useState('');
  const [body, setBodyValue] = useState('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [bodyError, setBodyError] = useState<boolean>(false);

  const setErrorsOnIputs = useCallback(() => {
    setBodyError(true);
    setNameError(true);
    setEmailError(true);
  }, []);

  const clearErrors = () => {
    setBodyError(false);
    setNameError(false);
    setEmailError(false);
  };

  const clearInputs = () => {
    setEmailValue('');
    setBodyValue('');
    setNameValue('');
    clearErrors();
  };

  const getDefaultSettings = () => {
    setBodyValue('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!name || !body || !email) {
      setErrorsOnIputs();

      return;
    }

    const newComment = {
      name,
      body,
      email,
    };

    addComment(newComment);
    getDefaultSettings();
    clearErrors();
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
              {
                'is-danger': (nameError && !name),
              },
            )}
            value={name}
            onChange={({ target }) => setNameValue(target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className={classNames(
              'fas',
              {
                'fa-exclamation-triangle': (nameError && !name),
              },
            )}
            />
          </span>
        </div>

        {(nameError && !name) && (
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
              {
                'is-danger': (emailError && !email),
              },
            )}
            value={email}
            onChange={({ target }) => setEmailValue(target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className={classNames(
              'fas',
              {
                'fa-exclamation-triangle': (emailError && !email),
              },
            )}
            />
          </span>
        </div>

        {(emailError && !email) && (
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
              'input',
              {
                'is-danger': (bodyError && !body),
              },
            )}
            value={body}
            onChange={({ target }) => setBodyValue(target.value)}
          />
        </div>

        {(bodyError && !body) && (
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
              {
                'is-loading': isInputUpdating,
              },
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
            onClick={clearInputs}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
