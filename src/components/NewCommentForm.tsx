import React, { useState } from 'react';
import cn from 'classnames';
import { Errors } from '../types/Errors';
import { usePosts } from '../context/PostContext';
import { Comment } from '../types/Comment';
import { createComment } from '../api/comments';

export const NewCommentForm: React.FC = () => {
  const {
    selectedPostId,
    setNewComment,
    loadingComments,
    setLoadingForm,
  } = usePosts();

  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [body, setBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setHasBodyError('');
  };

  const reset = () => {
    setName('');
    setEmail('');
    setBody('');
    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedPostId) {
      return;
    }

    const bodyTrimmed = body.trim();

    setHasNameError(!name);
    setHasEmailError(!email);

    if (!body) {
      setHasBodyError(Errors.ErrorMessage);
    }

    if (bodyTrimmed.length < 1) {
      setHasBodyError(Errors.ErrorMessage);
      setBody('');

      return;
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
      body: bodyTrimmed,
    };

    setLoadingForm(true);

    createComment(newComment)
      .then(() => {
        setNewComment(true);
        setLoadingForm(false);
        setBody('');
      });

    reset();
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={reset}
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
            onChange={handleNameChange}
            className={cn('input', {
              'is-danger': hasNameError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasNameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {Errors.ErrorName}
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
            onChange={handleEmailChange}
            className={cn('input', {
              'is-danger': hasEmailError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {Errors.ErrorEmail}
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
            onChange={handleBodyChange}
            className={cn('textarea', {
              'is-danger': hasBodyError,
            })}
          />
        </div>

        {hasBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {Errors.ErrorMessage}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': loadingComments,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
