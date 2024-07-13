import React, { useState } from 'react';
import cn from 'classnames';
import { addNewComment } from '../services/comment';
import { Comment } from '../types/Comment';
import { FormState } from '../types/FormState';
import { ErrorMessage } from './ErrorMessage';

type NewCommentFormProps = {
  postId: number;
  onAddNewComment: (newComment: Comment) => void;
};

const initialFormState: FormState = {
  authorName: '',
  email: '',
  comment: '',
  hasNameAuthorError: false,
  hasEmailError: false,
  hasCommentError: false,
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  postId,
  onAddNewComment,
}) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const [isloading, setIsLoading] = useState(false);

  const setFormValue = (field: keyof FormState, value: string | boolean) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const {
    authorName,
    email,
    comment,
    hasNameAuthorError,
    hasEmailError,
    hasCommentError,
  } = formState;

  const handleAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue('authorName', e.target.value);
    setFormValue('hasNameAuthorError', false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue('email', e.target.value);
    setFormValue('hasEmailError', false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue('comment', e.target.value);
    setFormValue('hasCommentError', false);
  };

  const handleReset = () => {
    setFormState(initialFormState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const trimmedAuthorName = authorName.trim();
    const trimmedEmail = email.trim();
    const trimmedComment = comment.trim();

    setFormValue('hasNameAuthorError', !trimmedAuthorName);
    setFormValue('hasEmailError', !trimmedEmail);
    setFormValue('hasCommentError', !trimmedComment);

    if (!trimmedAuthorName || !trimmedEmail || !trimmedComment) {
      setIsLoading(false);

      return;
    }

    const newComment = {
      postId: postId,
      name: trimmedAuthorName,
      email: trimmedEmail,
      body: trimmedComment,
    };

    addNewComment(newComment)
      .then(c => {
        onAddNewComment(c);
        setFormValue('comment', '');
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit} autoComplete="false">
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
            className={cn('input', { 'is-danger': hasNameAuthorError })}
            value={authorName}
            onChange={handleAuthorNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameAuthorError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        <ErrorMessage
          showError={hasNameAuthorError}
          message="Name is required"
        />
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
            className={cn('input', { 'is-danger': hasEmailError })}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        <ErrorMessage showError={hasEmailError} message="Email is required" />
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
            className={cn('textarea', { 'is-danger': hasCommentError })}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>

        <ErrorMessage showError={hasCommentError} message="Enter some text" />
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isloading })}
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
