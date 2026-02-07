import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import classNames from 'classnames';

interface Props {
  postId: number;
  onAdd: (comment: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({ postId, onAdd }) => {
  const [fields, setFields] = useState({ name: '', email: '', body: '' });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });
  const [onSubmit, setOnSubmit] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleClear = (keepAuthor = false) => {
    if (keepAuthor) {
      setFields(prev => ({ ...prev, body: '' }));
    } else {
      setFields({ name: '', email: '', body: '' });
    }

    setErrors({ name: false, email: false, body: false });
    setHasError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasError(false);

    const { name, email, body } = fields;

    if (!name.trim() || !email.trim() || !body.trim()) {
      setErrors({
        name: !name.trim(),
        email: !email.trim(),
        body: !body.trim(),
      });

      return;
    }

    setOnSubmit(true);

    const newComment = {
      name,
      email,
      body,
      postId,
    };

    client
      .post<Comment>(`/comments`, newComment)
      .then(res => {
        onAdd(res);
        handleClear(true);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setOnSubmit(false);
      });
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields(prev => ({ ...prev, name: event.target.value }));
    setHasError(false);
    setErrors(prev => ({ ...prev, name: false }));
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields(prev => ({ ...prev, email: event.target.value }));
    setHasError(false);
    setErrors(prev => ({ ...prev, email: false }));
  };

  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFields(prev => ({ ...prev, body: event.target.value }));
    setHasError(false);
    setErrors(prev => ({ ...prev, body: false }));
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={() => handleClear()}
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
            className={classNames('input', { 'is-danger': errors.name })}
            value={fields.name}
            onChange={handleChangeName}
            disabled={onSubmit}
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
            value={fields.email}
            onChange={handleChangeEmail}
            disabled={onSubmit}
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
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={fields.body}
            onChange={handleChangeBody}
            disabled={onSubmit}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {hasError && (
        <div className="notification is-danger" data-cy="CommentAddError">
          Unable to add a comment
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': onSubmit })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            disabled={onSubmit}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
