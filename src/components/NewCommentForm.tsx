import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { ErrorsType, InputDataType } from '../types/InputCommentData';
import { CommentData } from '../types/Comment';

export type NewCommentFormType = {
  addComment: (data: CommentData) => void;
  inputCommentData: CommentData;
  setInputCommentData: React.Dispatch<React.SetStateAction<InputDataType>>;
  selectedPost: Post;
  inputCommentErrors: ErrorsType;
  setInputCommentErrors: React.Dispatch<React.SetStateAction<ErrorsType>>;
  isSubmitting: boolean;
};

export const NewCommentForm: React.FC<NewCommentFormType> = ({
  addComment,
  inputCommentData,
  setInputCommentData,
  inputCommentErrors,
  setInputCommentErrors,
  isSubmitting,
}) => {
  const { name, email, body } = inputCommentData;
  const { nameError, emailError, bodyError } = inputCommentErrors;

  const handleSubmit = (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();

    setInputCommentErrors(prevError => ({
      ...prevError,
      nameError: name.trim() ? '' : 'Name is required',
      emailError: email.trim() ? '' : 'Email is required',
      bodyError: body.trim() ? '' : 'Comment cannot be empty',
    }));

    const hasErrors = Object.values(inputCommentErrors).some(
      error => error !== '',
    );

    if (hasErrors) {
      return;
    } else {
      addComment({
        name: inputCommentData.name.trim(),
        email: inputCommentData.email.trim(),
        body: inputCommentData.body.trim(),
      });
    }
  };

  const clearAllErrors = () => {
    setInputCommentErrors({ nameError: '', emailError: '', bodyError: '' });
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
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={e => {
              setInputCommentData({
                ...inputCommentData,
                name: e.target.value,
              });
              setInputCommentErrors({
                ...inputCommentErrors,
                nameError: '',
              });
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {nameError && (
            <span
              className={classNames('icon', 'is-small', 'is-right', {
                'has-text-danger': nameError,
              })}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {nameError && (
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
            className={classNames('input', { 'is-danger': emailError })}
            value={email}
            onChange={e => {
              setInputCommentData({
                ...inputCommentData,
                email: e.target.value,
              });
              setInputCommentErrors({
                ...inputCommentErrors,
                emailError: '',
              });
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className={classNames('icon', 'is-small', 'is-right', {
                'has-text-danger': emailError,
              })}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {emailError && (
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
            className={classNames('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={e => {
              setInputCommentData({
                ...inputCommentData,
                body: e.target.value,
              });
              setInputCommentErrors({
                ...inputCommentErrors,
                bodyError: '',
              });
            }}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearAllErrors}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
