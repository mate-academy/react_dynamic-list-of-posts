import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';
import PropTypes from 'prop-types';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  postId: number;
  onAdd: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const isNameEmpty = !name.trim();
    const isEmailEmpty = !email.trim();
    const isBodyEmpty = !body.trim();

    setNameError(isNameEmpty);
    setEmailError(isEmailEmpty);
    setBodyError(isBodyEmpty);
    setIsSubmitError(false);

    if (isNameEmpty || isEmailEmpty || isBodyEmpty) {
      return;
    }

    const newComment: CommentData = {
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
    };

    setIsSubmitting(true);

    client
      .post<Comment>('/comments', { ...newComment, postId })
      .then(comment => {
        onAdd(comment);
        setBody('');
      })
      .catch(() => {
        setIsSubmitError(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');

    setNameError(false);
    setEmailError(false);
    setBodyError(false);
    setIsSubmitError(false);
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
            className={classNames('input', {
              'is-danger': nameError,
            })}
            value={name}
            onChange={event => {
              setName(event.target.value);
              setNameError(false);
              setIsSubmitError(false);
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
            className={classNames('input', {
              'is-danger': emailError,
            })}
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setEmailError(false);
              setIsSubmitError(false);
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
            className={classNames('textarea', {
              'is-danger': bodyError,
            })}
            value={body}
            onChange={event => {
              setBody(event.target.value);
              setBodyError(false);
              setIsSubmitError(false);
            }}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {isSubmitError && (
        <div className="notification is-danger">
          Unable to add a comment. Please try again.
        </div>
      )}

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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};
