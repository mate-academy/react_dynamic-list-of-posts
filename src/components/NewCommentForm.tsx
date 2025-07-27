import React, { useState } from 'react';
import { CommentData, CommentInput } from '../types/Comment';
import classNames from 'classnames';

interface FormProps {
  postId: number;
  onAdd: (newComment: CommentData) => void;
  loading: boolean;
}

export const NewCommentForm: React.FC<FormProps> = ({
  postId,
  onAdd,
  loading,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [error, setError] = useState<string>('');

  const clearFields = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const clearError = () => setError('');

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) {
      clearError();
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      clearError();
    }
  };

  const onBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    if (error) {
      clearError();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim() === '') {
      setError('Name is required');

      return;
    }

    if (email.trim() === '') {
      setError('Email is required');

      return;
    }

    if (body.trim() === '') {
      setError('Enter some text');

      return;
    }

    const newComment: CommentInput = {
      postId: postId,
      name: name,
      email: email,
      body: body,
    };

    onAdd(newComment);
    clearFields();
    clearError();
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
            className={classNames(`input`, { 'is-danger': error })}
            onChange={onNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {error && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {error && error === 'Name is required' && (
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
            className={classNames(`input`, { 'is-danger': error })}
            onChange={onEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {error && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {error && error === 'Email is required' && (
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
            className={classNames(`textarea`, { 'is-danger': error })}
            onChange={onBodyChange}
          />
        </div>

        {error && error === 'Enter some text' && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(`button`, `is-link`, {
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
            onClick={clearFields}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
