/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import cn from 'classnames';

import { CommentData } from '../types/Comment';

type Props = {
  handleCreateComment: (comment: CommentData) => void;
  isCommentLoading: boolean;
};

const initialComment: CommentData = {
  name: '',
  body: '',
  email: '',
};

const initialErrors = {
  name: false,
  email: false,
  body: false,
};

export const NewCommentForm: React.FC<Props> = ({
  handleCreateComment,
  isCommentLoading,
}) => {
  const [comment, setComment] = useState<CommentData>(initialComment);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (field: string, value: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
    setComment((prevComment) => ({
      ...prevComment,
      [field]: value,
    }));
  };

  const handleClear = () => {
    setComment(initialComment);
    setErrors(initialErrors);
  };

  const clearAfterAdd = () => {
    setComment((prevComment) => ({
      ...prevComment,
      body: '',
    }));
    setErrors(initialErrors);
  };

  const onAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = comment.name.trim();
    const isEmailValid = comment.email.trim();
    const isBodyValid = comment.body.trim();

    const isAllInformationValid = isNameValid && isEmailValid && isBodyValid;

    if (!isAllInformationValid) {
      setErrors({
        name: !isNameValid,
        email: !isEmailValid,
        body: !isBodyValid,
      });
    } else {
      handleCreateComment(comment);
      clearAfterAdd();
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onAddComment}>
      {/* ... (other form elements) ... */}

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
            className={cn('input', { 'is-danger': errors.name })}
            value={comment.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            {errors.name && (
              <i className="fas fa-exclamation-triangle" />
            )}
          </span>
        </div>

        {errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      {/* ... (similar changes for other fields) ... */}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn(
              'button',
              'is-link',
              { 'is-loading': isCommentLoading },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
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
