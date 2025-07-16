import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onAddComment: (comment: CommentData) => void;
  isAddCommentLoading: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  onAddComment,
  isAddCommentLoading,
}) => {
  type Errors = {
    name: boolean;
    email: boolean;
    body: boolean;
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<Errors>({
    name: false,
    email: false,
    body: false,
  });

  function handleNameInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    setErrors(prev => ({ ...prev, name: false }));
  }

  function handleEmailInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    setErrors(prev => ({ ...prev, email: false }));
  }

  function handleBodyInputChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setBody(event.target.value);
    setErrors(prev => ({ ...prev, body: false }));
  }

  function handleAddCommentSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name || !email || !body) {
      if (!name) {
        setErrors(prev => ({ ...prev, name: true }));
      }

      if (!email) {
        setErrors(prev => ({ ...prev, email: true }));
      }

      if (!body) {
        setErrors(prev => ({ ...prev, body: true }));
      }

      return;
    }

    onAddComment({ name, email, body });
    setBody('');
  }

  function handleClearForm() {
    setName('');
    setEmail('');
    setBody('');
    setErrors({
      name: false,
      email: false,
      body: false,
    });
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={handleAddCommentSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={name}
            onChange={handleNameInputChange}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': errors.name })}
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
            value={email}
            onChange={handleEmailInputChange}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
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
            value={body}
            onChange={handleBodyInputChange}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': errors.body })}
          />
        </div>

        {errors.body && (
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
              'is-loading': isAddCommentLoading,
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
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
