import React from 'react';
import { useState } from 'react';
import cn from 'classnames';
import { CommentData } from '../types/Comment';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  onSubmit: (comment: CommentData) => void;
  post?: Post | null;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit, post }) => {
  // Name
  const [name, setName] = useState('');
  const [nameError, setnameError] = useState('');
  // EMAIL
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  // body
  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    setnameError('');
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError('');
  };

  const handleTextChange = (value: string) => {
    setBody(value);
    setBodyError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setName('');
    setEmail('');
    setBody('');

    if (!name.trim()) setnameError('Name is required');
    if (!email.trim()) setEmailError('Email is required');
    if (!body.trim()) setBodyError('Enter some text');
    if (!name || !email || !body) return;

    setIsLoading(true);

    onSubmit({ name, email, body });
  };

  const handleClearButton = () => {
    setName(post?.name || '');
    setnameError('');

    setEmail(post?.email || '');
    setEmailError('');

    setBody(post?.body || '');
    setBodyError('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author
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
          Author Email
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
            value={body}
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': bodyError })}
            onChange={e => handleTextChange(e.target.value)}
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
            className={cn('button is-link', { 'is-loading': isLoading })}
            onClick={handleClearButton}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
