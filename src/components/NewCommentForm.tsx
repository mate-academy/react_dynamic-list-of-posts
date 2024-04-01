import React, { useState } from 'react';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  comments: Comment[];
  updateComments: (comments: Comment[]) => void;
  postId: number;
  addCommentsError: (value: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  comments,
  updateComments,
  postId,
  addCommentsError,
}) => {
  const [nameQuery, setNameQuery] = useState<string>('');
  const [emailQuery, setEmailQuery] = useState<string>('');
  const [textareaQuery, setTextareaQuery] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [textareaError, setTextareaError] = useState<boolean>(false);

  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);

  const handleNameQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setNameQuery(event.target.value);
    setNameError(false);
  };

  const handleEmailQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setEmailQuery(event.target.value);
    setEmailError(false);
  };

  const handleTextareaQueryChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setTextareaQuery(event.target.value);
    setTextareaError(false);
  };

  const resetForm = (): void => {
    setNameQuery('');
    setEmailQuery('');
    setTextareaQuery('');

    setNameError(false);
    setEmailError(false);
    setTextareaError(false);
  };

  const handleSubmitComment = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();

    if (!nameQuery.trim()) {
      setNameError(true);
    }

    if (!emailQuery.trim()) {
      setEmailError(true);
    }

    if (!textareaQuery.trim()) {
      setTextareaError(true);
    }

    if (!nameQuery.trim() || !emailQuery.trim() || !textareaQuery.trim()) {
      return;
    }

    setIsFormSubmitting(true);

    const newComment = {
      postId,
      name: nameQuery,
      email: emailQuery,
      body: textareaQuery,
    };

    client
      .post<CommentData>('/comments', newComment)
      .then(postedComment => {
        updateComments([...comments, { ...postedComment, id: 0 }]);
        setTextareaQuery('');
      })
      .catch(() => addCommentsError(true))
      .finally(() => setIsFormSubmitting(false));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitComment}>
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
            value={nameQuery}
            onChange={handleNameQueryChange}
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
            className={classNames('input', { 'is-danger': emailError })}
            value={emailQuery}
            onChange={handleEmailQueryChange}
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
            className={classNames('textarea', { 'is-danger': textareaError })}
            value={textareaQuery}
            onChange={handleTextareaQueryChange}
          />
        </div>

        {textareaError && (
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
              'is-loading': isFormSubmitting,
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
            disabled={isFormSubmitting}
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
