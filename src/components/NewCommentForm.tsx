import React, { useState } from 'react';
import classNames from 'classnames';
import { addComment } from '../api/comments';
import { Comment } from '../types/Comment';
import { ErrorMessage } from '../types/ErrorMessage';

interface Props {
  selectedPostId: number,
  onSetComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  onSetErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessage | null>>,
}

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  onSetComments,
  onSetErrorMessage,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasTextError, setHasTextError] = useState(false);
  const [hasAddButtonLoader, setHasAddButtonLoader] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setHasTextError(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedText = text.trim();

    if (!trimmedName) {
      setName(trimmedName);
      setHasNameError(true);
    }

    if (!trimmedEmail) {
      setEmail(trimmedEmail);
      setHasEmailError(true);
    }

    if (!trimmedText) {
      setText(trimmedText);
      setHasTextError(true);
    }

    if (!trimmedName || !trimmedEmail || !trimmedText) {
      return;
    }

    setHasAddButtonLoader(true);
    addComment({
      name: trimmedName,
      email: trimmedEmail,
      body: text,
      postId: selectedPostId,
    })
      .then(comment => {
        onSetComments(prevState => [...prevState, comment]);
      })
      .catch(() => {
        onSetErrorMessage(ErrorMessage.ADD_COMMENT_ERROR);
      })
      .finally(() => {
        setHasAddButtonLoader(false);
        setName(trimmedName);
        setEmail(trimmedEmail);
        setText('');
      });
  };

  const handleFormClear = () => {
    setName('');
    setEmail('');
    setText('');
    setHasNameError(false);
    setHasEmailError(false);
    setHasTextError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
            className={classNames('input', {
              'is-danger': hasNameError,
            })}
            value={name}
            onChange={handleNameChange}
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
            className={classNames('input', {
              'is-danger': hasEmailError,
            })}
            value={email}
            onChange={handleEmailChange}
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
            className={classNames('textarea', {
              'is-danger': hasTextError,
            })}
            value={text}
            onChange={handleTextChange}
          />
        </div>

        {hasTextError && (
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
              'is-loading': hasAddButtonLoader,
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
            onClick={handleFormClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
