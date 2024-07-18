'use strict';

import classNames from 'classnames';
import React, { FormEvent, useContext, useState } from 'react';
import { addComments } from '../utils/fetchClient';
import { CommentContext } from './CommentContext';
import { PostContext } from './PostsContext';

export const NewCommentForm: React.FC = () => {
  const { setErrorNotification, selectedPost } = useContext(PostContext);

  const { setCommentsFromPost, commentsFromPost } = useContext(CommentContext);

  const [authorField, setAuthorField] = useState('');
  const [bodyField, setBodyField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [authorError, setAuthorError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const onClearButton = () => {
    setAuthorField('');
    setEmailField('');
    setBodyField('');
    setAuthorError(false);
    setBodyError(false);
    setEmailError(false);
  };

  const handleSubmit = (event: FormEvent) => {
    setSubmitLoading(true);
    setAuthorError(false);
    setEmailError(false);
    setBodyError(false);
    event.preventDefault();
    const emptyAuthorField = !authorField.trim();
    const emptyBodyField = !bodyField.trim();
    const emptyEmailField = !emailField.trim();

    if (emptyBodyField && emptyAuthorField && emptyEmailField) {
      setSubmitLoading(false);
      setAuthorError(true);
      setEmailError(true);
      setBodyError(true);

      return;
    }

    if (emptyAuthorField) {
      setAuthorError(true);
    }

    if (emptyBodyField) {
      setBodyError(true);
    }

    if (emptyEmailField) {
      setEmailError(true);
    }

    if (!bodyField) {
      setSubmitLoading(false);

      return;
    }

    if (selectedPost) {
      const postId = selectedPost.id;

      addComments({
        postId,
        name: authorField,
        email: emailField,
        body: bodyField,
      })
        .then(newComment => {
          setCommentsFromPost([...commentsFromPost, newComment]);
          setBodyField('');
        })
        .catch(() => {
          setErrorNotification('Unable to add comment');
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={onClearButton}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={authorField}
            onChange={e => setAuthorField(e.target.value)}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': authorError })}
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
            value={emailField}
            onChange={e => setEmailField(e.target.value)}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': emailError })}
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
            value={bodyField}
            onChange={e => setBodyField(e.target.value)}
            placeholder="Type comment here"
            className={classNames('input', { 'is-danger': bodyError })}
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
              'is-loading': submitLoading,
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
