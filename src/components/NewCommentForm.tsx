import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  onAddComment: (comment: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onAddComment }) => {
  const [newCommentValues, setNewCommentValues] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const [inputErrors, setInputErrors] = useState({
    nameError: '',
    emailError: '',
    commentError: '',
  });

  const [isAddingComment, setIsAddingComment] = useState(false);

  const validateInput = (fieldName: string, value: string) => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }

    return '';
  };

  const handleChange = (fieldName: string, value: string) => {
    setNewCommentValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [`${fieldName}Error`]: '',
    }));
  };

  const clearAll = () => {
    setInputErrors({
      nameError: '',
      emailError: '',
      commentError: '',
    });
    setNewCommentValues({
      name: '',
      email: '',
      comment: '',
    });
  };

  const postComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputErrors({
      nameError: validateInput('Name', newCommentValues.name),
      emailError: validateInput('Email', newCommentValues.email),
      commentError: validateInput('Comment', newCommentValues.comment),
    });

    if (!inputErrors.nameError
      && !inputErrors.emailError && !inputErrors.commentError) {
      try {
        setIsAddingComment(true);

        const newComment: CommentData = {
          name: newCommentValues.name,
          email: newCommentValues.email,
          body: newCommentValues.comment,
        };

        await onAddComment(newComment);
      } catch {
        throw new Error("Can't add new comment");
      } finally {
        setIsAddingComment(false);
        setNewCommentValues((prevValues) => ({
          ...prevValues,
          comment: '',
        }));
      }
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={postComment}>
      {/* Input for Author Name */}
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
            className={classNames('input',
              { 'is-danger': inputErrors.nameError })}
            value={newCommentValues.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {/* Icon for error indication */}
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {/* Error icon shown when there is a nameError */}
          {inputErrors.nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {/* Error message shown when there is a nameError */}
        {inputErrors.nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {inputErrors.nameError}
          </p>
        )}
      </div>

      {/* Input for Author Email */}
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
            className={classNames('input',
              { 'is-danger': inputErrors.emailError })}
            value={newCommentValues.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />

          {/* Icon for error indication */}
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {/* Error icon shown when there is an emailError */}
          {inputErrors.emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {/* Error message shown when there is an emailError */}
        {inputErrors.emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {inputErrors.emailError}
          </p>
        )}
      </div>

      {/* Input for Comment Text */}
      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>
        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea',
              { 'is-danger': inputErrors.commentError })}
            value={newCommentValues.comment}
            onChange={(e) => handleChange('comment', e.target.value)}
          />
        </div>

        {/* Error message shown when there is a commentError */}
        {inputErrors.commentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {inputErrors.commentError}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button',
              'is-link', { 'is-loading': isAddingComment })}
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
