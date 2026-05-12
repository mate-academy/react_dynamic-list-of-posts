import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { createPostComments } from '../utils/api';

type Props = {
  selectedPostId: number | null;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setTempComment: (value: Comment | null) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  setComments,
  setTempComment,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [, setErrorMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  function createComment(newComment: Omit<Comment, 'id'>) {
    if (selectedPostId !== null) {
      setIsLoading(true);
      setTempComment({
        id: 0,
        ...newComment,
      });

      return createPostComments(newComment)
        .then(createdComment => {
          setComments(prev => [...prev, createdComment]);
          setBody('');
        })
        .catch(error => {
          setErrorMessage('Unable to add comment');
          throw error;
        })
        .finally(() => {
          setTempComment(null);
          setIsLoading(false);
        });
    }

    return;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (selectedPostId !== null) {
      if (!name.trim()) {
        setNameError('Name is required');
      }

      if (!email.trim()) {
        setEmailError('Email is required');
      }

      if (!body.trim()) {
        setBodyError('Enter some text');
      }

      if (!body || !email || !name) {
        return;
      }

      await createComment({ postId: selectedPostId, name, email, body });
    }
  }

  function handleReset() {
    setName('');
    setEmail('');
    setBody('');
    setNameError('');
    setEmailError('');
    setBodyError('');
  }

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
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
            className={classNames('input', {
              'is-danger': nameError,
            })}
            value={name}
            onChange={event => {
              setNameError('');
              setName(event.target.value);
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
            className={classNames('input', {
              'is-danger': emailError,
            })}
            value={email}
            onChange={event => {
              setEmailError('');
              setEmail(event.target.value);
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
            className={classNames('textarea', {
              'is-danger': bodyError,
            })}
            value={body}
            onChange={event => {
              setBodyError('');
              setBody(event.target.value);
            }}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {bodyError}
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
            disabled={isLoading}
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
