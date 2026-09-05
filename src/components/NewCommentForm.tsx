import React, { useState } from 'react';
import { NewCommentData } from '../types/Comment';
import classNames from 'classnames';

type Props = {
  postId: number;
  onSubmit: (v: NewCommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [commentName, setCommentName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [commentEmail, setCommentEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  function resetErrors() {
    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  }

  function clear() {
    setCommentName('');
    setCommentEmail('');
    setCommentBody('');
    resetErrors();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setHasNameError(!commentName);
    setHasEmailError(!commentEmail);
    setHasBodyError(!commentBody);

    if (!commentName || !commentEmail || !commentBody) {
      return;
    }

    const newCommentData: NewCommentData = {
      postId,
      name: commentName,
      email: commentEmail,
      body: commentBody,
    };

    setIsSubmitting(true);

    onSubmit(newCommentData)
      .then(() => {
        setCommentBody('');
        resetErrors();
      })
      .finally(() => setIsSubmitting(false));
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
            className={classNames('input', { 'is-danger': hasNameError })}
            value={commentName}
            onChange={e => setCommentName(e.currentTarget.value)}
            onBlur={() => {
              setHasNameError(!commentName);
            }}
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

        {hasNameError && commentName.length === 0 && (
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
            className={classNames('input', { 'is-danger': hasEmailError })}
            value={commentEmail}
            onChange={e => setCommentEmail(e.currentTarget.value)}
            onBlur={() => {
              setHasEmailError(!commentEmail);
            }}
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
            className={classNames('input', { 'is-danger': hasBodyError })}
            value={commentBody}
            onChange={e => setCommentBody(e.currentTarget.value)}
            onBlur={() => {
              setHasBodyError(!commentBody);
            }}
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
            className={classNames('button is-link', {
              'is-loading': isSubmitting,
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
            onClick={() => clear()}
            disabled={isSubmitting}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
