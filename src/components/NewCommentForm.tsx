/* eslint-disable @typescript-eslint/no-shadow */
import classNames from 'classnames';
import React, { useState } from 'react';
import { AppComment } from '../types/Comment';
import * as commentsServices from '../api/apiCommentsFromServer';

type Props = {
  setComments: React.Dispatch<React.SetStateAction<AppComment[]>>;
  selectedPostId: number | null;
};

export const NewCommentForm: React.FC<Props> = ({
  setComments,
  selectedPostId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError('');
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setBodyError('');
  };

  function addComment({ postId, name, email, body }: Omit<AppComment, 'id'>) {
    setError('');

    return commentsServices
      .addComment({ postId, name, email, body })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
      })
      .catch(e => {
        setError('Unable to add a comment');
        throw e;
      });
  }

  function reset() {
    setName('');
    setEmail('');
    setBody('');
    setNameError('');
    setEmailError('');
    setBodyError('');
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      setNameError('Name is required');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
    }

    if (!body.trim()) {
      setBodyError('Enter some text');
    }

    if (!name.trim() || !email.trim() || !body.trim()) {
      return;
    }

    if (!selectedPostId) {
      return;
    }

    setIsLoading(true);
    const trimmed = {
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
    };

    addComment({
      postId: selectedPostId,
      ...trimmed,
    })
      .then(() => setBody(''))
      .finally(() => setIsLoading(false));
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {nameError}
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
            {emailError}
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
              'is-danger': bodyError,
            })}
            value={body}
            onChange={handleBodyChange}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {bodyError}
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
            disabled={isLoading}
            onClick={reset}
          >
            Clear
          </button>

          {!isLoading && error && (
            <div
              className="notification is-danger"
              data-cy="CommentsLoadingError"
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
