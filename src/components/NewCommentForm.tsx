import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface Props {
  postId: number;
  onAddComment: (comment: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    body: '',
    errors: { name: false, email: false, body: false },
    isSubmitting: false,
    hasSubmitError: false,
  });

  useEffect(() => {
    setFormState({
      name: '',
      email: '',
      body: '',
      errors: { name: false, email: false, body: false },
      isSubmitting: false,
      hasSubmitError: false,
    });
  }, [postId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormState(prev => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: false },
      hasSubmitError: false,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      name: !formState.name.trim(),
      email: !formState.email.trim(),
      body: !formState.body.trim(),
    };

    if (newErrors.name || newErrors.email || newErrors.body) {
      setFormState(prev => ({ ...prev, errors: newErrors }));

      return;
    }

    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      hasSubmitError: false,
    }));

    const newCommentData = {
      postId,
      name: formState.name.trim(),
      email: formState.email.trim(),
      body: formState.body.trim(),
    };

    client
      .post<Comment>('/comments', newCommentData)
      .then(newComment => {
        onAddComment(newComment);
        setFormState(prev => ({
          ...prev,
          body: '',
          isSubmitting: false,
        }));
      })
      .catch(() => {
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          hasSubmitError: true,
        }));
      });
  };

  const handleClear = () => {
    setFormState({
      name: '',
      email: '',
      body: '',
      errors: { name: false, email: false, body: false },
      isSubmitting: false,
      hasSubmitError: false,
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      {formState.hasSubmitError && (
        <div className="notification is-danger" data-cy="AddCommentError">
          Unable to add a comment. Please try again.
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
            className={classNames('input', {
              'is-danger': formState.errors.name,
            })}
            value={formState.name}
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {formState.errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {formState.errors.name && (
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
              'is-danger': formState.errors.email,
            })}
            value={formState.email}
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {formState.errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {formState.errors.email && (
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
              'is-danger': formState.errors.body,
            })}
            value={formState.body}
            onChange={handleChange}
          />
        </div>
        {formState.errors.body && (
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
              'is-loading': formState.isSubmitting,
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
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  onAddComment: PropTypes.func.isRequired,
};
