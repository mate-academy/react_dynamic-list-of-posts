import React, { FormEvent, useState } from 'react';
import { addNewComment } from '../services/comment';
import classNames from 'classnames';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  // setComments: (comments: Comment[]) => void;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setError: (value: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setComments,
  setError,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleOnChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (event.target.name === 'name') {
      setName(event.target.value);
      setNameError(false);
    }

    if (event.target.name === 'email') {
      setEmail(event.target.value);
      setEmailError(false);
    }

    if (event.target.name === 'body') {
      setBody(event.target.value);
      setBodyError(false);
    }
  }

  const handleClearComment = () => {
    setName('');
    setEmail('');
    setBody('');
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBody = body.trim();

    if (!trimmedName || !trimmedEmail || !trimmedBody) {
      if (!trimmedName) {
        setNameError(true);
      }

      if (!trimmedEmail) {
        setEmailError(true);
      }

      if (!trimmedBody) {
        setBodyError(true);
      }

      return;
    }

    setIsLoading(true);

    addNewComment({
      postId,
      name,
      email,
      body,
    })
      .then(newComment =>
        setComments(currentComments => [...currentComments, newComment]),
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
        setBody('');
      });
  }

  return (
    <form data-cy="NewCommentForm">
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
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={handleOnChange}
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
            className={classNames('input', { 'is-danger': emailError })}
            value={email}
            onChange={handleOnChange}
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
            className={classNames('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={handleOnChange}
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
            className={classNames('button is-link', {
              'is-loading': isLoading,
            })}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearComment}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
