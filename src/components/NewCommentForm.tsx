import classNames from 'classnames';
import React, { useState } from 'react';
import * as serviceData from '../api/serviceData';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  postId: number;
  addComment: (comment: Comment) => void;
  setError: (message: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  addComment,
  setError,
}) => {
  const [nameField, setNameField] = useState('');
  const [hasErrorName, setHasErrorName] = useState(false);

  const [emailField, setEmailField] = useState('');
  const [hasErrorEmail, setHasErrorEmail] = useState(false);

  const [bodyField, setBodyField] = useState('');
  const [hasErrorBody, setHasErrorBody] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const clearForm = () => {
    setNameField('');
    setHasErrorName(false);

    setEmailField('');
    setHasErrorEmail(false);

    setBodyField('');
    setHasErrorBody(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameError = !nameField.trim();
    const emailError = !emailField.trim();
    const bodyError = !bodyField.trim();

    setHasErrorName(nameError);
    setHasErrorEmail(emailError);
    setHasErrorBody(bodyError);

    if (!nameError && !emailError && !bodyError) {
      const newCommentData: CommentData = {
        email: emailField.trim(),
        name: nameField.trim(),
        body: bodyField.trim(),
        postId: postId,
      };

      setIsLoading(true);

      serviceData
        .addComment(newCommentData)
        .then(newComment => {
          addComment(newComment);
          setBodyField('');
        })
        .catch(() => setError('Unable add comment'))
        .finally(() => setIsLoading(false));
    }

    return;
  };

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
            className={classNames('input', { 'is-danger': hasErrorName })}
            value={nameField}
            onChange={e => {
              setNameField(e.target.value);
              setHasErrorName(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasErrorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasErrorName && (
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
            className={classNames('input', { 'is-danger': hasErrorEmail })}
            value={emailField}
            onChange={e => {
              setEmailField(e.target.value);
              setHasErrorEmail(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasErrorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasErrorEmail && (
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
            className={classNames('textarea', { 'is-danger': hasErrorBody })}
            value={bodyField}
            onChange={e => {
              setBodyField(e.target.value);
              setHasErrorBody(false);
            }}
          />
        </div>

        {hasErrorBody && (
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
