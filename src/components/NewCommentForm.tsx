import React, { useState } from 'react';
import classNames from 'classnames';

import { addComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  setComments: React.Dispatch<React.SetStateAction<Comment[] | null>>;
  postId: number;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NewCommentForm: React.FC<Props> = ({
  setComments,
  postId,
  setIsError,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isCommentError, setIsCommentError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setIsNameError(false);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsEmailError(false);
  };

  const handleNewComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setIsCommentError(false);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const comment = {
      name,
      email,
      body,
      postId,
    };

    if (!name.length) {
      setIsNameError(true);
    }

    if (!email.length) {
      setIsEmailError(true);
    }

    if (!body.length) {
      setIsCommentError(true);
    }

    if (name.length && email.length && body.length) {
      setIsLoading(true);

      addComment(comment)
        .then(newComment => {
          setComments(comments => (
            (comments) ? [...comments, newComment] : [newComment]
          ));
          setIsError(false);
          setBody('');
        })
        .catch(() => setIsError(true))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const reset = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => handleOnSubmit(event)}
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
            className={classNames(
              'input',
              { 'is-danger': isNameError },
            )}
            value={name}
            onChange={handleName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': isEmailError },
            )}
            value={email}
            onChange={handleEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
            className={classNames(
              'textarea',
              { 'is-danger': isCommentError },
            )}
            value={body}
            onChange={handleNewComment}
          />
        </div>

        {isCommentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link',
              { 'is-loading': isLoading },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
