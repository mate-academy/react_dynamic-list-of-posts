import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import classNames from 'classnames';

type Props = {
  postId: number;
  onCommentAdd: (comment: Comment) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onCommentAdd }) => {
  const [userName, setUserName] = useState<string>('');
  const [userNameError, setUserNameError] = useState(false);

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState(false);

  const [comment, setComment] = useState<string>('');
  const [commentError, setCommentError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    setUserNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const resetForm = () => {
    setUserName('');
    setEmail('');
    setComment('');
    setUserNameError(false);
    setEmailError(false);
    setCommentError(false);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComment(event.target.value);
    setCommentError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setUserNameError(!userName);
    setEmailError(!email);
    setCommentError(!comment);

    if (!userName || !email || !comment) {
      return;
    }

    setIsSubmitting(true);

    onCommentAdd({
      id: 0,
      postId,
      name: userName,
      email,
      body: comment,
    })
      .then(() => {
        setComment('');
        setCommentError(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
            className={classNames('input', { 'is-danger': userNameError })}
            value={userName}
            onChange={handleUserNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {userNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {userNameError && (
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
            className={classNames('textarea', { 'is-danger': commentError })}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        {commentError && (
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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
