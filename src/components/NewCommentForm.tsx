import React, { useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import cn from 'classnames';
import { addComment } from '../api/Comments';

type Errors = Partial<Record<keyof CommentData, string>>;

type Props = {
  postId: number;
  onCommentAdded: (comment: Comment) => void;
};

const emptyForm: CommentData = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC<Props> = ({ postId, onCommentAdded }) => {
  const [formData, setFormData] = useState<CommentData>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const field = name as keyof CommentData;

    setFormData(current => ({ ...current, [field]: value }));
    setSubmitError(false);

    setErrors(current => {
      const nextErrors = { ...current };

      delete nextErrors[field];

      return nextErrors;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Errors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
    }

    if (!formData.body.trim()) {
      nextErrors.body = 'Enter some text';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);
    try {
      const comment = await addComment({ ...formData, postId });

      onCommentAdded(comment);
      setFormData(current => ({ ...current, body: '' }));
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ ...emptyForm });
    setErrors({});
    setSubmitError(false);
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

        <div
          className={cn('control', 'has-icons-left', {
            'has-icons-right': errors.name,
          })}
        >
          <input
            id="comment-author-name"
            type="text"
            name="name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': errors.name })}
            value={formData.name}
            onChange={handleChange}
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

        <div
          className={cn('control', 'has-icons-left', {
            'has-icons-right': errors.email,
          })}
        >
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': errors.email })}
            value={formData.email}
            onChange={handleChange}
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
            className={cn('textarea', { 'is-danger': errors.body })}
            value={formData.body}
            onChange={handleChange}
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
          {submitError && (
            <p className="help is-danger">
              Could not add comment. Please try again
            </p>
          )}
          <button
            type="submit"
            className={cn('button', 'is-link', { 'is-loading': isSubmitting })}
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
