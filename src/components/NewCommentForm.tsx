import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

export type NewCommentFormProps = {
  handleAddComment: (newComment: CommentData) => void
  sending: boolean
};

export const NewCommentForm: React.FC<NewCommentFormProps>
= ({ handleAddComment, sending }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const [nameCheck, setNameCheck] = useState<boolean>(true);
  const [emailCheck, setEmailCheck] = useState<boolean>(true);
  const [bodyCheck, setBodyCheck] = useState<boolean>(true);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameCheck(true);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailCheck(true);
  };

  const handleBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setBodyCheck(true);
  };

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name) {
      setNameCheck(false);
    }

    if (!email) {
      setEmailCheck(false);
    }

    if (!body) {
      setBodyCheck(false);
    }

    if (name && email && body) {
      handleAddComment({ name, email, body });
      setBody('');
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSend}>
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
            className={classNames('input', { 'is-danger': !nameCheck })}
            value={name}
            onChange={handleName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!nameCheck && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {!nameCheck && (
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
            className={classNames('input', { 'is-danger': !emailCheck })}
            value={email}
            onChange={handleEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!emailCheck && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!emailCheck && (
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
            className={classNames('textarea', { 'is-danger': !bodyCheck })}
            value={body}
            onChange={handleBody}
          />
        </div>

        {!bodyCheck && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': sending })} // is-loading
            onClick={handleSend}
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
