import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { addComment } from '../services/comment';

type Props = {
  selectedPost: Post;
  setComments: (value: Comment[] | { (prev: Comment[]): Comment[] }) => void,
  setErrorMessage: (value: string) => void;
};

const initialFormValues = {
  name: '',
  email: '',
  body: '',
};

const initialErrors = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  setComments,
  setErrorMessage,
}) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialErrors);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues((prev) => ({
      ...prev, [event.target.name]: event.target.value,
    }));
    setErrors((prev) => ({ ...prev, [event.target.name]: '' }));
  };

  const handleReset = () => {
    setErrors({ name: '', email: '', body: '' });
    setFormValues({ name: '', email: '', body: '' });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const normilizedName = formValues.name.trim();
    const normilizedEmail = formValues.email.trim();
    const normilizedComment = formValues.body.trim();

    if (!normilizedName) {
      setErrors((prev) => ({ ...prev, name: 'Name is required' }));
    }

    if (!normilizedEmail) {
      setErrors({
        ...errors,
        email: 'Email is required',
      });
    }

    if (normilizedEmail && !emailPattern.test(normilizedEmail)) {
      setErrors({
        ...errors,
        email: 'Email is invalid',
      });
    }

    if (!normilizedComment) {
      setErrors((prev) => ({ ...prev, body: 'Enter some text' }));
    }

    if (!normilizedName
    || !emailPattern.test(normilizedEmail)
    || !normilizedComment
    ) {
      return;
    }

    const newComment = {
      id: 0,
      postId: selectedPost.id,
      name: formValues.name,
      email: formValues.email,
      body: formValues.body,
    };

    setIsSubmitting(true);

    addComment(newComment)
      .then(response => {
        setComments((prev: Comment[]) => [...prev, response]);
      })
      .catch(() => setErrorMessage('Can not add a comment, try again later'))
      .finally(() => {
        setIsSubmitting(false);

        setFormValues({
          ...formValues,
          body: '',
        });
      });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            value={formValues.name}
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

        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.email}
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
              'is-danger': errors.email,
            })}
            value={formValues.email}
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
              'is-danger': errors.body,
            })}
            value={formValues.body}
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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
