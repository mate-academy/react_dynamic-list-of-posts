import React, { useState } from 'react';
import classNames from 'classnames';

import { Comment, CommentData } from '../types/Comment';
import { CommentError } from '../types/CommentError';
import { createComment } from '../api/comment';

const initialComment: CommentData = {
  name: '',
  email: '',
  body: '',
};

const initialErrors: CommentError = {
  nameError: false,
  emailError: false,
  bodyError: false,
};

type Props = {
  chosenPostId: number,
  addNewComment: (comment: Comment) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  chosenPostId,
  addNewComment,
}) => {
  const [newComment, setNewComment] = useState<CommentData>(initialComment);
  const [errors, setErrors] = useState(initialErrors);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const fieldErrorName = `${fieldName}Error`;

    setNewComment({
      ...newComment,
      [fieldName]: fieldValue,
    });

    setErrors({
      ...errors,
      [fieldErrorName]: false,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { name, email, body } = newComment;

    if (!name) {
      setErrors((currentErrors) => {
        return {
          ...currentErrors,
          nameError: true,
        };
      });
    }

    if (!email) {
      setErrors((currentErrors) => {
        return {
          ...currentErrors,
          emailError: true,
        };
      });
    }

    if (!body) {
      setErrors((currentErrors) => {
        return {
          ...currentErrors,
          bodyError: true,
        };
      });
    }

    if (name && email && body) {
      setIsSubmitting(true);

      createComment(chosenPostId, newComment)
        .then(() => {
          addNewComment({
            ...newComment,
            postId: chosenPostId,
            id: +new Date(),
          });
          setNewComment({
            ...newComment,
            body: '',
          });
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  const handleReset = () => {
    setNewComment(initialComment);
    setErrors(initialErrors);
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
            className={classNames('input', {
              'is-danger': errors.nameError,
            })}
            value={newComment.name}
            onChange={handleChange}
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
              'is-danger': errors.emailError,
            })}
            value={newComment.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.emailError && (
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
              'is-danger': errors.bodyError,
            })}
            value={newComment.body}
            onChange={handleChange}
          />
        </div>

        {errors.bodyError && (
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
