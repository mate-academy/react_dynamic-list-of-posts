/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import cn from 'classnames';

import { Comment } from '../types/Comment';
import { FormErrors } from '../types/FormsError';
import { apiActions } from '../utils/apiActions';

type Props = {
  onComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  id: number;
};

export const NewCommentForm: React.FC<Props> = ({ onComments, id }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const [nameError, setNameError] = useState(FormErrors.None);
  const [emailError, setEmailError] = useState(FormErrors.None);
  const [commentError, setCommentError] = useState(FormErrors.None);

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setName(e.target.value);
    setNameError(FormErrors.None);
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
    setEmailError(FormErrors.None);
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComment(e.target.value);
    setCommentError(FormErrors.None);
  };

  const validation = (value: string) => {
    const trimValue = value.trim();

    return trimValue.length > 0;
  };

  const resetError = () => {
    setCommentError(FormErrors.None);
    setEmailError(FormErrors.None);
    setNameError(FormErrors.None);
  };

  const reset = () => {
    setName('');
    setEmail('');
    setComment('');
  };

  const submit = () => {
    const isNameValid = validation(name);
    const isEmailValid = validation(email);
    const isCommentValid = validation(comment);

    if (!isNameValid) {
      setNameError(FormErrors.Name);
    }

    if (!isEmailValid) {
      setEmailError(FormErrors.Email);
    }

    if (!isCommentValid) {
      setCommentError(FormErrors.Comment);
    }

    if (isNameValid && isEmailValid && isCommentValid) {
      setIsSubmitLoading(true);
      apiActions.addComment({
        postId: id,
        name,
        email,
        body: comment,
      })
        .then((newComment) => {
          onComments((currentComments) => [...currentComments, newComment]);
          setComment('');
        })
        .finally(() => setIsSubmitLoading(false));
    }
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    submit();
  };

  const handleReset = () => {
    reset();
    resetError();
  };

  return (
    <form data-cy="NewCommentForm">
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
            className={cn('input', { 'is-danger': nameError })}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {nameError}
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
            className={cn('input', { 'is-danger': emailError })}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {emailError}
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
            className={cn('textarea', { 'is-danger': commentError })}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>

        {commentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {commentError}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            onClick={handleSubmit}
            type="submit"
            className={cn('button is-link', { 'is-loading': isSubmitLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            onClick={handleReset}
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
