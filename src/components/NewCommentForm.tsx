import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onSubmit: (data: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [{ name, email, body }, setFields] = useState({
    name: '',
    email: '',
    body: '',
  });
  const [{ isErrName, isErrEmail, isErrBody }, setIsErrors] = useState({
    isErrName: false,
    isErrEmail: false,
    isErrBody: false,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    setFields(current => ({ ...current, [field]: value }));
    setIsErrors(current => ({ ...current, [field]: false }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nameTrimmed = name.trim();
    const emailTrimmed = email.trim();
    const bodyTrimmed = body.trim();

    setIsErrors({
      isErrName: !nameTrimmed,
      isErrEmail: !emailTrimmed,
      isErrBody: !bodyTrimmed,
    });

    if (!nameTrimmed || !emailTrimmed || !bodyTrimmed) {
      return;
    }

    setIsSubmitting(true);

    await onSubmit({ name, email, body });

    setIsSubmitting(false);
    setFields(current => ({ ...current, body: '' }));
  };

  const clearForm = () => {
    setFields({
      name: '',
      email: '',
      body: '',
    });

    setIsErrors({
      isErrName: false,
      isErrEmail: false,
      isErrBody: false,
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit} onReset={clearForm}>
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
            className={classNames('input', { 'is-danger': isErrName })}
            value={name}
            onChange={e => handleChange(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isErrName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrName && (
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
            className={classNames('input', { 'is-danger': isErrEmail })}
            value={email}
            onChange={e => handleChange(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isErrEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrEmail && (
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
            className={classNames('input', { 'is-danger': isErrBody })}
            value={body}
            onChange={e => handleChange(e)}
          />
        </div>

        {isErrBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
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
