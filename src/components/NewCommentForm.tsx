import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import classNames from 'classnames';

type Props = {
  nameError: string;
  emailError: string;
  bodyError: string;
  postId: number;
  handleSubmitForm: ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => Promise<boolean>;
  isNewCommentLoading: boolean;
  handleNameError: (nameError: string) => void;
  handleEmailError: (emailError: string) => void;
  handleBodyError: (bodyError: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  nameError,
  emailError,
  bodyError,
  postId,
  handleSubmitForm,
  isNewCommentLoading,
  handleNameError,
  handleEmailError,
  handleBodyError,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handlecommentBodyClear = () => {
    setBody('');
    handleNameError('');
    handleEmailError('');
    handleBodyError('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={event => {
        event.preventDefault();
        handleSubmitForm({ postId, name, email, body }).then(() => {
          setBody('');
        });
      }}
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
            onChange={event => {
              handleNameError('');
              setName(event.target.value);
            }}
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
            className={classNames('input', { 'is-danger': emailError })}
            value={email}
            onChange={event => {
              handleEmailError('');
              setEmail(event.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {emailError && (
            <span
              className={classNames('icon is-small is-right', {
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
            className={classNames('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={event => {
              handleBodyError('');
              setBody(event.target.value);
            }}
          />
        </div>
        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {bodyError}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isNewCommentLoading,
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
            onClick={handlecommentBodyClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
