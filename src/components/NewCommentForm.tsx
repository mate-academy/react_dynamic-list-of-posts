import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { addComments } from '../utils/fetchClient';

type Props = {
  onSubmit: (comment: Comment) => void;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit, postId }) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [textArea, setTextArea] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasTextAreaError, setHasTextAreaError] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.target.value);
    setHasNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorEmail(event.target.value);
    setHasEmailError(false);
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextArea(event.target.value);
    setHasTextAreaError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasNameError(!authorName);
    setHasEmailError(!authorEmail);
    setHasTextAreaError(!textArea);

    if (!authorName || !authorEmail || !textArea) {
      return;
    }

    setIsSubmiting(true);

    const newComment: Omit<Comment, 'id'> = {
      name: authorName,
      email: authorEmail,
      body: textArea,
      postId,
    };

    addComments(newComment)
      .then(savedComment => {
        onSubmit(savedComment);
        setTextArea('');
      })
      .catch(() => {
        throw new Error('Failed to submit comment');
      })
      .finally(() => {
        setIsSubmiting(false);
      });
  };

  const reset = () => {
    setAuthorName('');
    setAuthorEmail('');
    setTextArea('');
    setHasNameError(false);
    setHasEmailError(false);
    setHasTextAreaError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit} onReset={reset}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': hasNameError,
          })}
        >
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': hasNameError,
            })}
            value={authorName}
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

        <div
          className={classNames('control has-icons-left', {
            'has-icons-right': hasEmailError,
          })}
        >
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': hasEmailError,
            })}
            value={authorEmail}
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
              'is-danger': hasTextAreaError,
            })}
            value={textArea}
            onChange={handleTextAreaChange}
          />
        </div>

        {hasTextAreaError && (
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
              'is-loading': isSubmiting,
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
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
