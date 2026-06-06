import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CommentData, Comment } from '../types/Comment';
import { createComment } from '../api/postComments';

type Props = {
  postId: number;
  onAddComment: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasNameError = !name.trim();
    const hasEmailError = !email.trim();
    const hasBodyError = !body.trim();

    setNameError(hasNameError);
    setEmailError(hasEmailError);
    setBodyError(hasBodyError);

    if (hasNameError || hasEmailError || hasBodyError) {
      return;
    }

    setIsSubmitting(true);

    const commentData: CommentData & { postId: number } = {
      postId,
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
    };

    createComment(commentData)
      .then(newComment => {
        onAddComment(newComment);
        setBody('');
        setSubmitError(false);
      })
      .catch(() => {
        setSubmitError(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
    setSubmitError(false);
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
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={e => {
              setName(e.target.value);
              setNameError(false);
            }}
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
            className={classNames('input', { 'is-danger': emailError })}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
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
            className={classNames('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={e => {
              setBody(e.target.value);
              setBodyError(false);
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
            className={classNames('button', 'is-link', {
              'is-loading': isSubmitting,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>

      {submitError && (
        <p className="help is-danger">
          Unable to add a comment. Please try again.
        </p>
      )}
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  onAddComment: PropTypes.func.isRequired,
};
