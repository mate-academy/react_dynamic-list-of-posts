import React, { useState } from 'react';
import { Comment } from '../types/Comment';

import * as commentService from '../api/comments';
import classNames from 'classnames';

interface Props {
  postId: number;
  onCommentAdded: (newComment: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({ postId, onCommentAdded }) => {
  const emptyComment = {
    name: '',
    email: '',
    body: '',
  };

  const emptyErrors = {
    name: '',
    email: '',
    body: '',
  };

  const [comment, setComment] = useState(emptyComment);
  const [errors, setErrors] = useState(emptyErrors);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setComment(prevComment => ({ ...prevComment, [name]: value }));

    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = { ...emptyErrors };

    if (!comment.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!comment.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!comment.body.trim()) {
      newErrors.body = 'Enter some text';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every(err => err === '');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      setIsLoading(true);

      const newComment: Comment = {
        id: 0,
        postId: postId,
        name: comment.name,
        email: comment.email,
        body: comment.body,
      };

      commentService
        .addComment(newComment)
        .then(currentComment => {
          onCommentAdded(currentComment);
          setComment(prevComment => ({ ...prevComment, body: '' }));
        })
        .catch(() => setErrors(emptyErrors))
        .finally(() => setIsLoading(false));
    }
  };

  const handleClear = () => {
    setComment(emptyComment);
    setErrors(emptyErrors);
    setIsSubmitted(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleClear}
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
              'is-danger': isSubmitted && errors.name,
            })}
            value={comment.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isSubmitted && errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isSubmitted && errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.name}
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
              'is-danger': isSubmitted && errors.email,
            })}
            value={comment.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isSubmitted && errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isSubmitted && errors.email && (
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
            className={classNames('textarea', {
              'is-danger': isSubmitted && errors.body,
            })}
            value={comment.body}
            onChange={handleChange}
          />
        </div>

        {isSubmitted && errors.body && (
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
              'is-loading': isLoading,
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
