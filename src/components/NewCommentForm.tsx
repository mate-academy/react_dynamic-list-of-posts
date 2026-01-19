import React, { useState } from 'react';
import { addComment } from '../api/api';
import { Comment } from '../types/Comment';
import cn from 'classnames';

type Props = {
  postId: number;
  onSuccess: (newComment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onSuccess }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [text, setText] = useState<string>('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [textError, setTextError] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleNameChange = (value: string) => {
    setNameError(false);
    setName(value);
  };

  const handleEmailChange = (value: string) => {
    setEmailError(false);
    setEmail(value);
  };

  const handleTextChange = (value: string) => {
    setTextError(false);
    setText(value);
  };

  const clearForm = () => {
    setName('');
    setNameError(false);
    setEmail('');
    setEmailError(false);
    setText('');
    setTextError(false);
  };

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();

    const namesError = name.trim().length === 0;
    const emailsError =
      !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const bodyError = text.trim().length === 0;

    setNameError(namesError);
    setEmailError(emailsError);
    setTextError(bodyError);

    if (namesError || emailsError || bodyError) {
      return;
    }

    setLoading(true);

    try {
      const newComment = await addComment({
        postId,
        name: name.trim(),
        email: email.trim(),
        body: text.trim(),
      });

      onSuccess(newComment);
      setText('');
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleAdd}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={name}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': nameError })}
            onChange={event => handleNameChange(event.target.value)}
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
            value={email}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': emailError })}
            onChange={event => handleEmailChange(event.target.value)}
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
            value={text}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': textError })}
            onChange={event => handleTextChange(event.target.value)}
          />
        </div>

        {textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': loading })}
            disabled={loading}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
