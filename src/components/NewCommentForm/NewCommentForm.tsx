import React, { useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { Comment } from '../../types/Comment';

type Props = {
  postId: number;
  onAddComment: (data: Omit<Comment, 'id'>) => void;
  loading: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onAddComment,
  loading,
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState('');

  const inputNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputNameRef.current) {
      inputNameRef.current.focus();
    }
  }, []);

  const validateField = (field: string, value: string) => {
    if (!value) {
      switch (field) {
        case 'name':
          return 'Name is required';
        case 'email':
          return 'Email is required';
        case 'body':
          return 'Enter some text';
        default:
          return '';
      }
    }

    return '';
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setName(newValue);
    setNameError(validateField('name', newValue));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setEmail(newValue);
    setEmailError(validateField('email', newValue));
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;

    setBody(newValue);
    setBodyError(validateField('body', newValue));
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    const newNameError = validateField('name', name);
    const newEmailError = validateField('email', email);
    const newBodyError = validateField('body', body);

    setNameError(newNameError);
    setEmailError(newEmailError);
    setBodyError(newBodyError);

    if (newNameError || newEmailError || newBodyError) {
      return;
    }

    onAddComment({ postId, name, email, body });

    setBody('');
    setNameError('');
    setEmailError('');
    setBodyError('');
  };

  const handleResetForm = (event: React.FormEvent) => {
    event.preventDefault();

    setName('');
    setEmail('');
    setBody('');
    setNameError('');
    setEmailError('');
    setBodyError('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmitForm}
      onReset={handleResetForm}
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
            className={`input ${nameError ? 'is-danger' : ''}`}
            value={name}
            onChange={handleNameChange}
            ref={inputNameRef}
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
            className={`input ${emailError ? 'is-danger' : ''}`}
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
            className={`textarea ${bodyError ? 'is-danger' : ''}`}
            value={body}
            onChange={handleBodyChange}
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
            className={cn('button is-link', { 'is-loading': loading })}
          >
            Add
          </button>
        </div>
        <div className="control">
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
