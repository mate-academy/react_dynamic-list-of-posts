import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  onSubmit: (value: Comment) => Promise<void>;
  post: Post;
  comments: Comment[];
};

export const NewCommentForm: React.FC<Props> = ({
  onSubmit,
  post,
  comments,
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createErr, setCreateErr] = useState('');

  const reset = () => {
    setName('');
    setNameError(false);
    setEmail('');
    setEmailError(false);
    setBody('');
    setBodyError(false);
  };

  const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNameError(!name);
    setEmailError(!email);
    setBodyError(!body);

    if (!name || !body || !email) {
      return;
    }

    setCreateErr('');
    setIsSubmitting(true);

    onSubmit({
      id: Math.max(0, ...comments.map(comment => comment.id)) + 1,
      postId: post.id,
      name,
      email,
      body,
    })
      .then(() => setBody(''))
      .catch(() => {
        setCreateErr('Cannot create a new comment');
        setTimeout(() => {
          setCreateErr('');
        }, 3000);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmitHandle}>
      {createErr && <div className="notification is-danger">{createErr}</div>}
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
            value={name}
            onChange={e => {
              setName(e.target.value);
              setNameError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className={cn('icon is-small is-right', {
                'has-text-danger': nameError,
              })}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
          <p className="help is-danger" data-cy="errMsg">
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
            className={cn('input', { 'is-danger': emailError })}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className={cn('icon is-small is-right', {
                'has-text-danger': emailError,
              })}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
          <p className="help is-danger" data-cy="errMsg">
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
            className={cn('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={e => {
              setBody(e.target.value);
              setBodyError(false);
            }}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="errMsg">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isSubmitting })}
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
