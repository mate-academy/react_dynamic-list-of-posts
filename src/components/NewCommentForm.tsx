import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  onSubmit: (comment: CommentData) => void;
  loading: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  onSubmit,
  loading,
}) => {
  const [name, setName] = useState('');
  const [hasAuthorError, setHasAuthorError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasAuthorError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setHasBodyError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasAuthorError(!name.trim());
    setHasEmailError(!email.trim());
    setHasBodyError(!body.trim());

    if (!name.trim() || !email.trim() || !body.trim()) {
      return;
    }

    const newComment = { name, email, body };

    onSubmit(newComment);

    setBody('');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setHasAuthorError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
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
            className={
              classNames('input', { 'is-danger': hasAuthorError })
            }
            value={name}
            onChange={handleAuthorChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasAuthorError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasAuthorError && (
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
            className={
              classNames('input', { 'is-danger': hasEmailError })
            }
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
            value={body}
            className={
              classNames('textarea', { 'is-danger': hasBodyError })
            }
            onChange={handleBodyChange}
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
            className={
              classNames('button is-link', { 'is-loading': loading })
            }
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
