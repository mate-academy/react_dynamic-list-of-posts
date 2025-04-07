import classNames from 'classnames';

import React, { useState } from 'react';
import { createComment } from '../api/Metods';

export const NewCommentForm: React.FC = ({
  setComments,
  postId,
  setErrorType,
}) => {
  const [isInput, setIsInput] = useState('');
  const [isEmail, setIsEmail] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    body?: string;
  }>({});
  const [submited, setSubmited] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmited(true);

    const newErrors: typeof errors = {};

    if (!isInput.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!isEmail.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!newComment.trim()) {
      newErrors.body = 'Enter some text';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    createComment({
      postId,
      name: isInput,
      email: isEmail,
      body: newComment,
    })
      .then(createdComment => {
        setComments(prev => [...prev, createdComment]);
        setNewComment('');
        localStorage.setItem('name', isInput);
        localStorage.setItem('email', isEmail);
      })
      .finally(() => {
        setErrorType(null);
        setSubmited(false);
      });
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
              'is-danger': submited && errors.name,
            })}
            value={isInput}
            onChange={event => {
              setIsInput(event.target.value);

              if (errors.name) {
                setErrors(prev => ({ ...prev, name: undefined }));
              }
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {submited && errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {submited && errors.name && (
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
            value={isEmail}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': submited && errors.email,
            })}
            onChange={event => {
              setIsEmail(event.target.value);

              if (errors.email) {
                setErrors(prev => ({ ...prev, email: undefined }));
              }
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {submited && errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {submited && errors.email && (
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
            className={classNames('textarea', {
              'is-danger': submited && errors.body,
            })}
            value={newComment}
            onChange={event => {
              setNewComment(event.target.value);

              if (errors.body) {
                setErrors(prev => ({ ...prev, body: undefined }));
              }
            }}
          />
        </div>

        {submited && errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is link', { 'is-loading': submited })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              setSubmited(false);
              setErrors(prev => ({
                ...prev,
                name: undefined,
                email: undefined,
                body: undefined,
              }));
              setIsInput('');
              setIsEmail('');
              setNewComment('');
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
