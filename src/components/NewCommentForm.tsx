import React, { useState } from 'react';
import cn from 'classnames';

import { CommentData } from '../types/Comment';

type Props = {
  isCreatingComment: boolean,
  addComment: (comment: CommentData) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  isCreatingComment, addComment,
}) => {
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: '',
  });
  const [error, setError] = useState(false);
  const { name, email, body } = newComment;

  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !body.trim()) {
      setError(true);

      return;
    }

    addComment(newComment);
    setNewComment({ ...newComment, body: '' });
    setError(false);
  }

  function handleChangeFields(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name: fieldName, value: fieldValue } = event.target;

    setNewComment({ ...newComment, [fieldName]: fieldValue });
  }

  function handleResetForm() {
    setNewComment({ name: '', email: '', body: '' });
    setError(false);
  }

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmitForm}
      onReset={handleResetForm}
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
            className={cn('input', { 'is-danger': (error && !name.trim()) })}
            value={newComment.name}
            onChange={handleChangeFields}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {(error && !name.trim()) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {(error && !name.trim()) && (
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
            className={cn('input', { 'is-danger': (error && !email.trim()) })}
            value={newComment.email}
            onChange={handleChangeFields}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(error && !email.trim()) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {(error && !email.trim()) && (
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
            className={cn('input', { 'is-danger': (error && !body.trim()) })}
            value={newComment.body}
            onChange={handleChangeFields}
          />
        </div>

        {(error && !body.trim()) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isCreatingComment,
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
