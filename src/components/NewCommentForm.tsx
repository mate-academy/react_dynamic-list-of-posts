import classNames from 'classnames';
import React, { useState } from 'react';
import { createComment } from '../api/api';
import { Comment } from '../types/Comment';

type Props = {
  setComments: (arg: Comment[]) => void,
  POST_ID: number,
  setCommentError: (arg: boolean) => void,
  comments: Comment[] | null,
};

export const NewCommentForm: React.FC<Props> = ({
  setComments, POST_ID, setCommentError, comments,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    setNameError(false);
    setEmailError(false);
    setBodyError(false);

    if (!name.trim()) {
      setNameError(true);
      setIsLoading(false);
    }

    if (!email.trim()) {
      setEmailError(true);
      setIsLoading(false);
    }

    if (!body.trim()) {
      setBodyError(true);
      setIsLoading(false);
    } else {
      createComment({
        postId: POST_ID,
        body: body.trim(),
        name: name.trim(),
        email: email.trim(),
      })
        .then((newItem: Comment) => {
          if (comments) {
            setComments([...comments, newItem]);
          } else {
            setComments([newItem]);
          }

          setBody('');
        })
        .catch(() => {
          setCommentError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleReset = (event: React.FormEvent) => {
    event.preventDefault();
    setName('');
    setEmail('');
    setBody('');
  };

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
            onChange={(event) => setName(event.target.value)}
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
            onChange={(event) => setEmail(event.target.value)}
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
            onChange={(event) => setBody(event.target.value)}
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
            // className="button is-link is-loading"
            className={classNames('button is-link', {
              'is-loading': isLoading,
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
