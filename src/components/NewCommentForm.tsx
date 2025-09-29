import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { addPostComment } from './services/comments';
import { Comment } from '../types/Comment';

type Props = {
  addComment: (comment: Comment) => void;
  activePostId: number;
};

export const NewCommentForm: FC<Props> = ({
  addComment = () => {},
  activePostId,
}) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputText, setInputText] = useState('');

  const [hasInputNameError, setHasInputNameError] = useState(false);
  const [hasInputEmailError, setHasInputEmailError] = useState(false);
  const [hasInputTextError, setHasInputTextError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  function resetForm() {
    setInputText('');
  }

  function clearForm() {
    setInputText('');
    setInputEmail('');
    setInputName('');

    setHasInputNameError(false);
    setHasInputEmailError(false);
    setHasInputTextError(false);
  }

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (inputName.trim().length === 0) {
      setHasInputNameError(true);
    }

    if (inputEmail.trim().length === 0) {
      setHasInputEmailError(true);
    }

    if (inputText.trim().length === 0) {
      setHasInputTextError(true);
    }

    if (
      inputText.trim().length === 0 ||
      inputEmail.trim().length === 0 ||
      inputName.trim().length === 0
    ) {
      return;
    } else {
      const message = {
        name: inputName,
        email: inputEmail,
        body: inputText,
      };

      const newComment = { ...message, postId: activePostId };

      setIsLoading(true);
      addPostComment(newComment)
        .then(comment => {
          addComment(comment);
          resetForm();
        })
        .catch(() => 'Handle add and delete errors so the user can retry')
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleInputNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputName(event.target.value);
    setHasInputNameError(false);
  };

  const handleInputEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputEmail(event.target.value);
    setHasInputEmailError(false);
  };

  const handleInputTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInputText(event.target.value);
    setHasInputTextError(false);
  };

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
            className={classNames('input', { 'is-danger': hasInputNameError })}
            value={inputName}
            onChange={handleInputNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {hasInputNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {hasInputNameError && (
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
            value={inputEmail}
            onChange={handleInputEmailChange}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': hasInputEmailError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasInputEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {hasInputEmailError && (
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
            value={inputText}
            onChange={handleInputTextChange}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': hasInputTextError,
            })}
          />
        </div>
        {hasInputTextError && (
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
            // disabled={loading}
            onClick={event => {
              handleSubmit(event);
            }}
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
