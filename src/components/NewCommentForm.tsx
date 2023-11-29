import React, { useContext, useState } from 'react';

import cn from 'classnames';
import { Comment } from '../types/Comment';
import { postComment } from '../utils/requestService';
import { AppContext } from './Context';

export const NewCommentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState(false);

  const appContext = useContext(AppContext);

  const {
    selectedPostId,
    setNewComment,
  } = appContext;

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPostId) {
      return;
    }

    if (!name) {
      setNameError(true);
    }

    if (!email) {
      setEmailError(true);
    }

    if (!body) {
      setBodyError(true);
    }

    if (!name || !email || !body) {
      setBody('');

      return;
    }

    const newComment: Comment = {
      id: 0,
      postId: selectedPostId,
      name,
      email,
      body,
    };

    postComment(newComment)
      .then(() => setNewComment(true));
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
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
            value={name}
            onChange={event => {
              setName(event.target.value);
              setNameError(false);
            }}
            className={cn('input', {
              'is-danger': nameError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >

                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
        </div>

        {nameError
          && (
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
            onChange={event => {
              setEmail(event.target.value);
              setEmailError(false);
            }}
            className={cn('input', {
              'is-danger': emailError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >

                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
        </div>

        {emailError
          && (
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
            value={body}
            onChange={event => {
              setBody(event.target.value);
              setBodyError(false);
            }}
            className={cn('textarea', {
              'is-danger': bodyError,
            })}
          />
        </div>

        {bodyError
          && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Enter some text
            </p>
          )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', {
              kek: 'is-loading',
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
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
