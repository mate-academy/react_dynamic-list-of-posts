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

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  setComments,
  setErrorMessage,
}) => {
  const initialFormValues = {
    name: '',
    email: '',
    comment: '',
  };

  const initialErrors = {
    nameError: false,
    emailErrorMessage: '',
    commentError: false,
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialErrors);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({
      ...errors,
      nameError: false,
    });
    setFormValues({
      ...formValues,
      name: event.target.value,
    });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({
      ...errors,
      emailErrorMessage: '',
    });

    setFormValues({
      ...formValues,
      email: event.target.value,
    });
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setErrors({
      ...errors,
      commentError: false,
    });

    setFormValues({
      ...formValues,
      comment: event.target.value,
    });
  };

  const handleReset = () => {
    setErrors({
      nameError: false,
      emailErrorMessage: '',
      commentError: false,
    });

    setFormValues({
      name: '',
      email: '',
      comment: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const normilizedName = formValues.name.trim();
    const normilizedEmail = formValues.email.trim();

    setErrors({
      ...errors,
      nameError: !normilizedName,
      commentError: !formValues.comment,
    });

    if (!normilizedEmail) {
      setErrors({
        ...errors,
        emailErrorMessage: 'Email is required',
      });
    }

    if (normilizedEmail && !emailPattern.test(normilizedEmail)) {
      setErrors({
        ...errors,
        emailErrorMessage: 'Email is invalid',
      });
    }

    if (!normilizedName
      || !emailPattern.test(normilizedEmail)
      || !formValues.comment
    ) {
      return;
    }

    const newComment = {
      id: 0,
      postId: selectedPost.id,
      name: formValues.name,
      email: formValues.email,
      body: formValues.comment,
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
          comment: '',
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
            className={classNames('input', { 'is-danger': errors.nameError })}
            value={formValues.name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.nameError && (
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
            className={classNames('input', {
              'is-danger': errors.emailErrorMessage,
            })}
            value={formValues.email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.emailErrorMessage && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.emailErrorMessage && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.emailErrorMessage}
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
              'is-danger': errors.commentError,
            })}
            value={formValues.comment}
            onChange={handleCommentChange}
          />
        </div>

        {errors.commentError && (
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
