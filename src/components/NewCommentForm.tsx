import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  currentPostId: number;
  createNewComment: (
    currentPostId: number,
    { name, email, body }: CommentData,
  ) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({
  createNewComment,
  currentPostId,
}) => {
  const [authorFullName, setAuthorFullName] = useState('');
  const [errorAuthor, setErrorAuthor] = useState(false);

  const [authorEmail, setAuthorEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputFullName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorAuthor(false);
    setAuthorFullName(event.target.value);
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setAuthorEmail(event.target.value);
  };

  const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentError(false);
    setCommentText(event.target.value);
  };

  const onClear = () => {
    setErrorAuthor(false);
    setEmailError(false);
    setCommentError(false);
    setCommentText('');
    setAuthorFullName('');
    setAuthorEmail('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    setIsSubmit(true);

    setErrorAuthor(!authorFullName);
    setEmailError(!authorEmail);
    setCommentError(!commentText);

    if (!authorFullName || !authorEmail || !commentText) {
      setIsSubmit(false);

      return;
    }

    createNewComment(currentPostId, {
      name: authorFullName,
      email: authorEmail,
      body: commentText,
    }).finally(() => setIsSubmit(false));

    setCommentText('');
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
            className={classNames('input', { 'is-danger': errorAuthor })}
            value={authorFullName}
            onChange={handleInputFullName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorAuthor && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorAuthor && (
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
            value={authorEmail}
            onChange={handleInputEmail}
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
            value={commentText}
            onChange={handleTextArea}
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
            className={classNames(`button is-link`, { 'is-loading': isSubmit })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => onClear()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
