import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  onAdd: (newComment: Omit<Comment, 'id'>) => void;
  isAdding: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onAdd,
  isAdding,
}) => {
  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const editName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameMessage('');
    setName(event.target.value);
  };

  const editEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailMessage('');
    setEmail(event.target.value);
  };

  const editBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyMessage('');
    setBody(event.target.value);
  };

  const reset = () => {
    setName('');
    setEmail('');
    setBody('');
    setNameMessage('');
    setEmailMessage('');
    setBodyMessage('');
  };

  const addComment = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBody = body.trim();

    if (!trimmedName) {
      setNameMessage('Name is required');
      setName(name.trim());
    }

    if (!trimmedEmail) {
      setEmailMessage('Email is required');
      setEmail(email.trim());
    }

    if (!trimmedBody) {
      setBodyMessage('Comment body is required');
      setBody(body.trim());
    }

    if (!trimmedName || !trimmedEmail || !trimmedBody) {
      return;
    }

    onAdd({
      name: trimmedName,
      email: trimmedEmail,
      body: trimmedBody,
      postId,
    });

    setBody('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={event => addComment(event)}
      onReset={reset}
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
            className={classNames('input', { 'is-danger': nameMessage })}
            value={name}
            onChange={event => editName(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {nameMessage && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {nameMessage && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {nameMessage}
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
            className={classNames('input', { 'is-danger': emailMessage })}
            value={email}
            onChange={event => editEmail(event)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {emailMessage && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailMessage && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {emailMessage}
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
            className={classNames('textarea', { 'is-danger': bodyMessage })}
            value={body}
            onChange={event => editBody(event)}
          />
        </div>
        {bodyMessage && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {bodyMessage}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isAdding,
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
            disabled={isAdding}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
