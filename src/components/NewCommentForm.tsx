import classNames from 'classnames';
import React, { useState } from 'react';
import { createComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, setComments }) => {
  const [authorError, setAuthorError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const handleReset = () => {
    setAuthorError(false);
    setEmailError(false);
    setTextError(false);

    setAuthor('');
    setEmail('');
    setText('');
  };

  const handleCreateComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Direct validation of fields without needing to set errors first
    const isAuthorValid = author.trim() !== '';
    const isEmailValid = email.trim() !== '' && emailRegex.test(email);
    const isTextValid = text.trim() !== '';

    // If any validation fails, set the corresponding error state
    setAuthorError(!isAuthorValid);
    setEmailError(!isEmailValid); // fixed: we should set error if email is invalid
    setTextError(!isTextValid);

    // If all validations pass
    if (!isAuthorValid || !isEmailValid || !isTextValid) {
      return; // Exit early if any validation fails
    }

    // If all validations pass
    const comment = {
      id: 0,
      postId: postId,
      name: author,
      email: email,
      body: text,
    };

    setLoading(true);

    createComment(comment)
      .then(response => {
        // Reset input fields on successful comment creation
        setAuthor('');
        setEmail('');
        setText('');
        setComments(prev => [...prev, response]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={event => handleCreateComment(event)}
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
            className={classNames('input', { 'is-danger': authorError })}
            value={author}
            onChange={event => {
              setAuthorError(false);
              setAuthor(event.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {authorError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {authorError && (
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
            onChange={event => {
              setEmailError(false);
              setEmail(event.target.value);
            }}
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
            className={classNames('textarea', { 'is-danger': textError })}
            value={text}
            onChange={event => {
              setTextError(false);
              setText(event.target.value);
            }}
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
            className={classNames('button', 'is-link', {
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
