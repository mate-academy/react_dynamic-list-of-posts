import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';

import { Comment, CommentData } from '../types/Comment';

type Props = {
  postId: number;
  onSubmit: (data: CommentData & { postId: number }) => Promise<Comment>;
};

type FormErrors = Partial<Record<keyof CommentData, boolean>>;

export const NewCommentForm: React.FC<Props> = ({ postId, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const removeError = (field: keyof CommentData) => {
    setErrors(current => ({ ...current, [field]: false }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = {
      name: !name.trim(),
      email: !email.trim(),
      body: !body.trim(),
    };

    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.email || nextErrors.body) {
      return;
    }

    setIsSubmitting(true);

    onSubmit({
      postId,
      name,
      email,
      body,
    })
      .then(() => {
        setBody('');
        setErrors({});
      })
      .catch(() => {})
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({});
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
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
            value={name}
            onChange={event => {
              setName(event.target.value);
              removeError('name');
            }}
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
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              removeError('email');
            }}
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
            value={body}
            onChange={event => {
              setBody(event.target.value);
              removeError('body');
            }}
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
