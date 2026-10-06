import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const NewCommentForm: React.FC<{
  postId: number;
  onAddComment: (newComment: Comment) => void;
}> = ({ postId, onAddComment }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const [status, setStatus] = useState({
    isLoading: false,
    isSubmitError: false,
  });

  const handleClear = () => {
    setFormValues({
      name: '',
      email: '',
      body: '',
    });
    setFormErrors({
      name: false,
      email: false,
      body: false,
    });

    setStatus({
      isLoading: false,
      isSubmitError: false,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isNameInvalid = !formValues.name.trim();
    const isEmailInvalid = !formValues.email.trim();
    const isBodyInvalid = !formValues.body.trim();

    const nextErrors = {
      name: isNameInvalid,
      email: isEmailInvalid,
      body: isBodyInvalid,
    };

    setFormErrors(nextErrors);

    if (isNameInvalid || isEmailInvalid || isBodyInvalid) {
      return;
    }

    setStatus({
      isLoading: true,
      isSubmitError: false,
    });

    const CommentData = {
      postId,
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      body: formValues.body.trim(),
    };

    try {
      const newComment = await client.post<Comment>(`/comments`, CommentData);

      onAddComment(newComment);
      setFormValues({
        name: formValues.name,
        email: formValues.email,
        body: '',
      });
      setStatus({
        isLoading: false,
        isSubmitError: false,
      });
    } catch {
      setStatus({
        isLoading: false,
        isSubmitError: true,
      });
    }
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
            className={classNames('input', { 'is-danger': formErrors.name })}
            value={formValues.name}
            onChange={e => {
              setFormValues(current => ({ ...current, name: e.target.value }));
              setFormErrors(current => ({ ...current, name: false }));
              setStatus(current => ({ ...current, isSubmitError: false }));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {formErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {formErrors.name && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': formErrors.email })}
            value={formValues.email}
            onChange={e => {
              setFormValues(current => ({ ...current, email: e.target.value }));
              setFormErrors(current => ({ ...current, email: false }));
              setStatus(current => ({ ...current, isSubmitError: false }));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {formErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {formErrors.email && (
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
            className={classNames('textarea', { 'is-danger': formErrors.body })}
            value={formValues.body}
            onChange={e => {
              setFormValues(current => ({ ...current, body: e.target.value }));
              setFormErrors(current => ({ ...current, body: false }));
              setStatus(current => ({ ...current, isSubmitError: false }));
            }}
            disabled={status.isLoading}
          />
        </div>
        {formErrors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>
      {status.isSubmitError && (
        <div className="notification is-danger" data-cy="CommentSubmitError">
          Unable to add a comment
        </div>
      )}
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': status.isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className={classNames('button is-link', {
              'is-light': status.isLoading,
            })}
            onClick={handleClear}
            disabled={status.isLoading}
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
