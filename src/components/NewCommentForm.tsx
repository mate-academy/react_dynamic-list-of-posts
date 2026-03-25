import React, { useState } from 'react';
import cn from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  isAddCommentError: boolean;
  clearAddCommentError: () => void;
  onSubmit: (data: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({
  isAddCommentError,
  clearAddCommentError,
  onSubmit,
}) => {
  const [authorName, setAuthorName] = useState<string>('');
  const [authorEmail, setAuthorEmail] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();

    const hasNameError = authorName.trim().length === 0;
    const hasEmailError = authorEmail.trim().length === 0;
    const hasCommentError = comment.trim().length === 0;

    setNameError(hasNameError);
    setEmailError(hasEmailError);
    setCommentError(hasCommentError);

    if (hasNameError || hasEmailError || hasCommentError) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit({
        name: authorName,
        email: authorEmail,
        body: comment,
      });

      setComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clear = () => {
    setNameError(false);
    setEmailError(false);
    setCommentError(false);
    setComment('');
    setAuthorEmail('');
    setAuthorName('');
    clearAddCommentError();
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
            value={authorName}
            onChange={event => {
              setAuthorName(event.target.value);
              setNameError(false);
              clearAddCommentError();
            }}
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': nameError,
            })}
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
            value={authorEmail}
            onChange={event => {
              setAuthorEmail(event.target.value);
              setEmailError(false);
              clearAddCommentError();
            }}
            className={cn('input', {
              'is-danger': emailError,
            })}
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
            value={comment}
            onChange={event => {
              setComment(event.target.value);
              setCommentError(false);
              clearAddCommentError();
            }}
            className={cn('textarea', {
              'is-danger': commentError,
            })}
          />
        </div>

        {commentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {isAddCommentError && (
        <div className="notification is-danger">Failed to add a comment</div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
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
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
