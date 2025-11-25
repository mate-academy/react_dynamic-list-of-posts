import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import classNames from 'classnames';

interface NewCommentFormProps {
  postId: number;
  onAddComment: (newComment: Comment) => void;
}

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  postId,
  onAddComment,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [bodyError, setBodyError] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');

  const validate = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required!');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim()) || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Valid email is required!');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!body.trim()) {
      setBodyError('Enter some text');
      isValid = false;
    } else {
      setBodyError('');
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const newCommentData = {
      postId,
      name,
      email,
      body,
    };

    try {
      const newComment = await client.post<Comment>(
        '/comments',
        newCommentData,
      );

      onAddComment(newComment);

      setBody('');
    } catch (err) {
      setSubmitError('Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = (e: React.FormEvent) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setBody('');
    setNameError('');
    setEmailError('');
    setBodyError('');
    setSubmitError('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      {submitError && (
        <div className="notification is-danger">{submitError}</div>
      )}

      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            value={name}
            onChange={e => {
              setName(e.target.value);
              setNameError('');
            }}
            className={classNames('input', {
              'is-danger': nameError,
            })}
            disabled={isSubmitting}
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
          Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            className={classNames('input', {
              'is-danger': emailError,
            })}
            disabled={isSubmitting}
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
          Comment
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            value={body}
            onChange={e => {
              setBody(e.target.value);
              setBodyError('');
            }}
            className={classNames('textarea', {
              'is-danger': bodyError,
            })}
            disabled={isSubmitting}
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
              'is-loading': isSubmitting,
            })}
            disabled={isSubmitting}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
            disabled={isSubmitting}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
