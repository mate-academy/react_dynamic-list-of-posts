import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import * as apiService from '../api/api';

type Props = {
  postId: number
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
};

export const NewCommentForm: React.FC<Props> = ({ postId, setComments }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const isValidEmail = (emailValue: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(emailValue);
  };

  const reset = () => {
    setName('');
    setEmail('');
    setBody('');
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(false);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handleBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setBodyError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNameError(!name.trim());
    setEmailError(!isValidEmail(email));
    setBodyError(!body.trim());

    if (!name || !isValidEmail(email) || !body) {
      return;
    }

    const newComment = {
      id: 0,
      name,
      email,
      body,
      postId,
    };

    setIsLoadingSubmit(true);

    apiService.createComment(newComment)
      .then(commentCreate => {
        setComments(curComments => [...curComments, commentCreate as Comment]);
      })
      .finally(() => setIsLoadingSubmit(false));

    setBody('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={handleName}
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
            onChange={handleEmail}
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
            onChange={handleBody}
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
            className={classNames('button is-link',
              { 'is-loading': isLoadingSubmit })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => reset()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
