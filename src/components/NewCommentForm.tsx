import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { createComment } from '../Services/services';

type Props = {
  postComments: Comment[],
  setPostComments: (comment: Comment[]) => void,
  setErrorMessage: (str: string) => void,
  selectedPostId: number,
};

export const NewCommentForm: React.FC<Props> = ({
  postComments,
  setPostComments,
  setErrorMessage,
  selectedPostId,
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [textarea, setTextarea] = useState('');
  const [textareaError, setTextareaError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(event.target.value);
    setTextareaError(false);
  };

  const addComment = ({
    postId,
    name: commentName,
    email: commentEmail,
    body,
  }: Comment) => {
    setErrorMessage('');
    setLoading(true);

    createComment({
      postId,
      name: commentName,
      email: commentEmail,
      body,
    })
      .then(newComment => {
        setPostComments([...postComments, newComment]);
      })
      .catch(() => {
        setErrorMessage('Something went wrong!');
        setTextarea('');
      })
      .finally(() => {
        setLoading(false);
        setTextarea('');
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setNameError(!name.trim());
    setEmailError(!email.trim());
    setTextareaError(!textarea.trim());

    if (!name.trim() || !email.trim() || !textarea.trim()) {
      return;
    }

    addComment({
      id: postComments.length,
      postId: selectedPostId,
      name,
      email,
      body: textarea,
    });
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setTextarea('');
    setNameError(false);
    setEmailError(false);
    setTextareaError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            className={classNames('input', { 'is-danger': nameError })}
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
            className={classNames('textarea', { 'is-danger': emailError })}
            value={textarea}
            onChange={handleTextChange}
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
            className={classNames('button is-link', {
              'is-loading': loading,
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
