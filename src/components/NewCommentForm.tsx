import React, { useState } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  onSubmit: (newComment: Comment) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normilizedName = name.trim();
    const normilizedBody = body.trim();
    const normilizedEmail = email.trim();

    if (!normilizedBody) {
      setBodyError(true);
    }

    if (!normilizedEmail) {
      setEmailError(true);
    }

    if (!normilizedName) {
      setNameError(true);
    }

    if (normilizedBody && normilizedEmail && normilizedName) {
      setIsLoading(true);

      const newComment: Comment = {
        body: normilizedBody,
        email: normilizedEmail,
        name: normilizedName,
        postId,
        id: 0,
      };

      onSubmit(newComment).finally(() => {
        setIsLoading(false);
        setBody('');
      });
    }
  }

  function resetForm() {
    setName('');
    setEmail('');
    setBody('');
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
  }

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
            onChange={event => {
              setNameError(false);
              setName(event.target.value);
            }}
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', nameError ? 'is-danger' : '')}
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
            className={cn('input', emailError ? 'is-danger' : '')}
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setEmailError(false);
            }}
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
            name="body"
            placeholder="Type comment here"
            value={body}
            className={cn('textarea', bodyError ? 'is-danger' : '')}
            onChange={event => {
              setBodyError(false);
              setBody(event.target.value);
            }}
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
            className={cn('button', 'is-link', isLoading ? 'is-loading' : '')}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
