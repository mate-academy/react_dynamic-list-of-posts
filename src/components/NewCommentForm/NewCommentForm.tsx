import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../../types/Comment';
import { client } from '../../utils/fetchClient';
import { ErrorMessage } from '../../types/ErrorMessage';

interface Props {
  postId: number;
  setNewComment: (comment:Comment) => void;
  setErrorMessage: (message : ErrorMessage) => void;
}

export const NewCommentForm: React.FC<Props> = React.memo(({
  postId,
  setNewComment,
  setErrorMessage,
}) => {
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isBodyError, setIsBodyError] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNameError(false);
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailError(false);
    setEmail(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsBodyError(false);
    setBody(event.target.value);
  };

  const clear = () => {
    setName('');
    setEmail('');
    setBody('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsBodyError(false);
  };

  function addComment(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!name) {
      setIsNameError(true);
    }

    if (!email) {
      setIsEmailError(true);
    }

    if (!body) {
      setIsBodyError(true);
    }

    if (!name || !email || !body) {
      return;
    }

    setIsLoading(true);

    client.post<Comment>('/comments', {
      postId,
      name,
      email,
      body,
    })
      .then(setNewComment)
      .catch(e => {
        setErrorMessage(ErrorMessage.Add);
        throw new Error(e.message);
      })
      .finally(() => {
        setBody('');
        setIsLoading(false);
      });
  }

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
            placeholder="Name Surname"
            value={name}
            className={classNames('input', {
              'is-danger': isNameError,
            })}
            onChange={handleNameChange}
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
            id="comment-author-email"
            placeholder="email@test.com"
            value={email}
            className={classNames('input', {
              'is-danger': isEmailError,
            })}
            onChange={handleEmailChange}
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
            name="body"
            placeholder="Type comment here"
            value={body}
            className={classNames('textarea', {
              'is-danger': isBodyError,
            })}
            onChange={handleBodyChange}
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
            onClick={event => addComment(event)}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
