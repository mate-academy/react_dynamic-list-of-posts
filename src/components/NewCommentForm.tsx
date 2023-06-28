import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  onAddComment: (commnet: CommentData) => Promise<void>;
  postId: number,
};

export const NewCommentForm: React.FC<Props> = ({ onAddComment, postId }) => {
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    comment: false,
  });
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const errorsCheck = () => {
    const errors = {
      name: !comment.name.trim(),
      email: !comment.email.trim(),
      comment: !comment.body.trim(),
    };

    setFormErrors(errors);

    return Object.values(errors).every(error => !error);
  };

  const clearAll = () => {
    setFormErrors({
      name: false,
      email: false,
      comment: false,
    });
    setComment({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;

    setComment({ ...comment, [name]: value });
  };

  const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    errorsCheck();

    if (comment) {
      try {
        setIsAddingComment(true);

        const newComment = {
          name: comment.name,
          email: comment.email,
          body: comment.body,
          postId,
        };

        await onAddComment(newComment);
      } catch {
        throw new Error('Can\'t add new comment');
      } finally {
        setIsAddingComment(false);
        setComment({ ...comment, body: '' });
      }
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={postComment}
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
            className={classNames(
              'input',
              { 'is-danger': formErrors.name },
            )}
            value={comment.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.name && (
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
            className={classNames(
              'input',
              { 'is-danger': formErrors.email },
            )}
            value={comment.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.email && (
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
            className={classNames(
              'textarea',
              { 'is-danger': formErrors.comment },
            )}
            value={comment.body}
            onChange={handleChange}
          />
        </div>

        {formErrors.comment && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isAddingComment },
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
            onClick={clearAll}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
