import React, { useState } from 'react';
import cn from 'classnames';

import * as comentService from '../api/coments';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post | null;
  setComments: (callback: (currentTodos: Comment[]) => Comment[]) => void;
  setErrorLoadComents: (el: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  post,
  setComments,
  setErrorLoadComents,
}) => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [comentValue, setComentValue] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [comentError, setComentError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setNameValue('');
    setEmailValue('');
    setComentValue('');
    setNameError('');
    setEmailError('');
    setComentError('');
  };

  const addComent = (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => {
    setIsLoading(true);

    return comentService
      .postComment({ postId, name, email, body })
      .then((newComent: Comment) => {
        setComments(currentComents => [...currentComents, newComent]);
      })
      .catch(er => {
        setErrorLoadComents(true);
        throw er;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!nameValue.trim()) {
      setNameError('Name is required');
    }

    if (!emailValue.trim()) {
      setEmailError('Email is required');
    }

    if (!comentValue.trim()) {
      setComentError('Enter some text');
    }

    if (nameValue.trim() && emailValue.trim() && comentValue.trim() && post) {
      addComent(post.id, nameValue, emailValue, comentValue);
      setComentValue('');
    }
  };

  const handleNameInput = (textValue: string) => {
    setNameValue(textValue);
    setNameError('');
  };

  const handleEmailInput = (textValue: string) => {
    setEmailValue(textValue);
    setEmailError('');
  };

  const handleComentInput = (textValue: string) => {
    setComentValue(textValue);
    setComentError('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
            className={cn('input', { 'is-danger': nameError })}
            value={nameValue}
            onChange={ev => {
              handleNameInput(ev.target.value);
            }}
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
            className={cn('input', { 'is-danger': emailError })}
            value={emailValue}
            onChange={ev => handleEmailInput(ev.target.value)}
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
            className={cn('textarea', { 'is-danger': comentError })}
            value={comentValue}
            onChange={ev => handleComentInput(ev.target.value)}
          />
        </div>

        {comentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {comentError}
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
            onClick={() => {
              reset();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
