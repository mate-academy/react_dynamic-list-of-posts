import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { createComment } from '../utils/api';

type Props = {
  postId: number;
  onCommentAdded: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ onCommentAdded, postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasNameError = isSubmitted && !name.trim();
  const hasEmailError = isSubmitted && !email.trim();
  const hasBodyError = isSubmitted && !body.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    const isNameEmpty = !name.trim();
    const isEmailEmpty = !email.trim();
    const isBodyEmpty = !body.trim();

    if (isNameEmpty || isEmailEmpty || isBodyEmpty) {
      return;
    }

    setIsSubmitting(true);

    createComment(postId, {
      name,
      email,
      body,
    })
      .then(newComment => {
        onCommentAdded(newComment);
        setBody('');
        setIsSubmitted(false);
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setIsSubmitted(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleClear}
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
            className={classNames('input', { 'is-danger': hasNameError })}
            value={name}
            onChange={event => setName(event.target.value)}
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
            className={classNames('input', { 'is-danger': hasEmailError })}
            value={email}
            onChange={event => setEmail(event.target.value)}
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
            className={classNames('textarea', { 'is-danger': hasBodyError })}
            value={body}
            onChange={event => setBody(event.target.value)}
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
            className={classNames('button', 'is-link', {
              'is-loading': isSubmitting,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
