import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  selectedPost: Post | null,
  isPostComment: boolean,
  onAddComment: (data: CommentData) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  isPostComment,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState({
    postId: selectedPost?.id,
    name: '',
    email: '',
    body: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    body: '',
  });

  /* eslint-disable-next-line */
  const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validateEmail = (email: string) => {
    return String(email)
      .match(EMAIL_REGEX);
  };

  const validForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      body: '',
    };

    if (!newComment.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!newComment.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (!validateEmail(newComment.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!newComment.body.trim()) {
      newErrors.body = 'Enter some text';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setNewComment({
      ...newComment,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validForm()) {
      onAddComment(newComment);
      setNewComment({
        postId: selectedPost?.id,
        name: newComment.name,
        email: newComment.email,
        body: '',
      });
      setErrors({
        name: '',
        email: '',
        body: '',
      });
    }
  };

  const handleClear = () => {
    setNewComment({
      postId: selectedPost?.id,
      name: '',
      email: '',
      body: '',
    });
    setErrors({
      name: '',
      email: '',
      body: '',
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
            value={newComment.name}
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

        <div className="control has-icons-left has-icons-right">
          <input
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
            value={newComment.email}
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
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={newComment.body}
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
            className={classNames(
              'button is-link',
              { 'is-loading': isPostComment },
            )}
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
