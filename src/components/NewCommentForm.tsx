import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface Props {
  postId: number;
  onCommentAdded: (comment: Comment) => void;
}

interface FormErrors {
  name: string;
  email: string;
  body: string;
}

export const NewCommentForm: React.FC<Props> = ({ postId, onCommentAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    body: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: name.trim() ? '' : 'Name is required',
      email: email.trim() ? '' : 'Email is required',
      body: body.trim() ? '' : 'Enter some text',
    };

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email && !newErrors.body;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);

    const commentData = {
      postId,
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
    };

    client
      .post<Comment>('/comments', commentData)
      .then(newComment => {
        onCommentAdded(newComment);
        setBody('');
        setErrors({ name: '', email: '', body: '' });
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
    setErrors({ name: '', email: '', body: '' });
    setSubmitError(false);
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
    if (errors.body) {
      setErrors(prev => ({ ...prev, body: '' }));
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      {submitError && (
        <div className="notification is-danger">
          Something went wrong while adding the comment. Please try again.
        </div>
      )}

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
            className={classNames('input', { 'is-danger': errors.name })}
            value={name}
            onChange={e => handleNameChange(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.name}
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
            className={classNames('input', { 'is-danger': errors.email })}
            value={email}
            onChange={e => handleEmailChange(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.email}
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
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={body}
            onChange={e => handleBodyChange(e.target.value)}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
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
  onCommentAdded: PropTypes.func.isRequired,
};
