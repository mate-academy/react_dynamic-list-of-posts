import React from 'react';
import { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  onSubmit: (post: Post) => void;
  users: User[];
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit, users }) => {
  // Name
  const [name, setName] = useState('');
  const [nameError, setnameError] = useState(false);
  // EMAIL
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  // TEXT
  const [text, setText] = useState('');
  const [textError, setTextError] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    setnameError(false);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(false);
  };

  const handleTextChange = (value: string) => {
    setText(value);
    setTextError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name) setnameError('Name is required');
    if (!email) setEmailError('Email is required');
    if (!text) setTextError('Enter some text');
    if (!name || !email || !text) return;

    onSubmit({ id: 0, name, email, text });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          {name}
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            value={name}
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': nameError })}
            onChange={e => handleNameChange(e.target.value)}
          />
          {nameError && (
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
          )}
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>
        {nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {nameError}
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          {email}
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': emailError })}
            onChange={e => handleEmailChange(e.target.value)}
          />
          {emailError && (
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
          )}
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>
        {emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {nameError}
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          {text}
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            value={text}
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': textError })}
            onChange={e => handleTextChange(e.target.value)}
          />
        </div>
        {textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {textError}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link is-loading">
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
