import React, { useState } from 'react';
import classNames from 'classnames';
import { addComment } from '../api/comments';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post,
  handleResponse: (data: Comment) => void,
  handleFormVisibility: () => void,
};

export const NewCommentForm: React.FC<Props> = (
  { selectedPost, handleResponse, handleFormVisibility },
) => {
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [body, setBody] = useState<string>('');
  const [bodyError, setBodyError] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();

    if (name === '') {
      setNameError(true);
    }

    if (email === '') {
      setEmailError(true);
    }

    if (body === '') {
      setBodyError(true);
    }

    if (name && email && body) {
      setIsLoading(true);

      addComment({
        postId: selectedPost.id,
        name: name.trim(),
        email: email.trim(),
        body,
      })
        .then(response => handleResponse(response))
        .catch(() => {
          setResponseError(true);
        })
        .finally(() => {
          setIsLoading(false);
          setName('');
          setEmail('');
          setBody('');
          handleFormVisibility();
        });
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');

    handleFormVisibility();
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
            className={classNames('input', {
              'is-danger': nameError,
            })}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setNameError(false);
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
            className={classNames('input', {
              'is-danger': emailError,
            })}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError(false);
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
            className={classNames('textarea', {
              'is-danger': bodyError,
            })}
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
              setBodyError(false);
            }}
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
        {responseError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Unable to add comment, try again.
          </p>
        )}
      </div>
    </form>
  );
};
