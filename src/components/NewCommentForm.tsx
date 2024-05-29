import React, { useState } from 'react';
import cn from 'classnames';
import { createComment } from '../api/comments';
import { Comment } from '../types/Comment';

interface Props {
  postId: number;
  addComment: (newComment: Comment) => void;
  setError: (err: string) => void;
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  addComment,
  setError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commenBodyError, setCommentBodyError] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const handlerReset = () => {
    setName('');
    setEmail('');
    setCommentBody('');
    setNameError(false);
    setEmailError(false);
    setCommentBodyError(false);
  };

  const handlerFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const normalizeName = name.trim();
    const normalizeEmail = email.trim();
    const normalizeCommentBody = commentBody.trim();

    let hasError = false;

    if (!normalizeName) {
      setNameError(true);
      hasError = true;
    }

    if (!normalizeEmail) {
      setEmailError(true);
      hasError = true;
    }

    if (!normalizeCommentBody) {
      setCommentBodyError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newComment = {
      postId: postId,
      name: normalizeName,
      email: normalizeEmail,
      body: commentBody,
    };

    setIsLoading(true);

    createComment(newComment)
      .then(commentFromServer => {
        addComment(commentFromServer);
        setCommentBody('');
      })
      .catch(() => setError('Unable add comment'))
      .finally(() => setIsLoading(false));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handlerFormSubmit}>
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
            value={name}
            onChange={evt => {
              setName(evt.target.value);
              setNameError(false);
            }}
            className={cn('input', { 'is-danger': !!nameError })}
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
            value={email}
            onChange={evt => {
              setEmail(evt.target.value);
              setEmailError(false);
            }}
            className={cn('input', { 'is-danger': !!emailError })}
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
            className={cn('input', { 'is-danger': !!commenBodyError })}
            value={commentBody}
            onChange={evt => {
              setCommentBody(evt.target.value);
              setCommentBodyError(false);
            }}
          />
        </div>

        {commenBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handlerReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
