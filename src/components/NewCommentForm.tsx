import cl from 'classnames';
import React, { FormEvent, useState } from 'react';
import { addComment } from '../api/api';
import { pause } from '../utils/methods';
import { Comment } from '../types/Comment';

interface Props {
  postId: number;
  onAddComment: (v: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleAddChange = async () => {
    setNameError(!name);
    setEmailError(!email);
    setBodyError(!body);

    if (!name || !email || !body) {
      return;
    }

    const newComment = {
      postId,
      name,
      email,
      body,
    };

    setIsLoading(true);
    try {
      await pause();

      const res = await addComment(newComment);

      onAddComment(res);
      setBody('');
    } catch {
      throw new Error('Unable to add a comment');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    setBodyError(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');

    setNameError(false);
    setEmailError(false);
    setBodyError(false);
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
            className={cl('input', { 'is-danger': nameError })}
            value={name}
            onChange={handleAuthorChange}
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
            className={cl('input', { 'is-danger': emailError })}
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
            className={cl('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={handleCommentChange}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cl('button is-link', {
              'is-loading': isLoading,
            })}
            onClick={handleAddChange}
          >
            Add
            {/**is-loading have to be in className onClick */}
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
