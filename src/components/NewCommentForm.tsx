import React, { useState } from 'react';
import classNames from 'classnames';
import { addComment } from '../api/postComments';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  onCommentAdd: (comment: Comment) => void;
};

type FormErrors = {
  name?: boolean;
  email?: boolean;
  body?: boolean;
  submit?: boolean;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onCommentAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setErrors(current => ({ ...current, name: false }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrors(current => ({ ...current, email: false }));
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setErrors(current => ({ ...current, body: false }));
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({});
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: FormErrors = {
      name: !name.trim(),
      email: !email.trim(),
      body: !body.trim(),
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.body) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newComment = await addComment({
        postId,
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      });

      onCommentAdd(newComment);
      setBody('');
    } catch {
      setErrors(current => ({ ...current, submit: true }));
    } finally {
      setIsSubmitting(false);
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
            className={classNames('input', { 'is-danger': errors.name })}
            value={name}
            onChange={handleNameChange}
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
            onChange={handleEmailChange}
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
            onChange={handleBodyChange}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {errors.submit && (
        <div className="notification is-danger is-light">
          Failed to add a comment. Please try again.
        </div>
      )}

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
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
