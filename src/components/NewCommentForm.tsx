import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import classNames from 'classnames';
import * as postServise from '../api/comments';
import { ErrorNotification } from './ErrorNotification';

type Props = {
  setNewComment: (comment: Comment) => void;
  postId: number | null;
};

interface ValidationErrors {
  name?: boolean;
  email?: boolean;
  body?: boolean;
}

export const NewCommentForm: React.FC<Props> = ({ setNewComment, postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState<ValidationErrors>({
    name: false,
    email: false,
    body: false,
  });
  const [loading, setLoading] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    newErrors.name = name.trim().length === 0;
    newErrors.email = email.trim().length === 0;
    newErrors.body = body.trim().length === 0;

    return newErrors;
  };

  const errorTimeout = () => {
    setErrorSubmit(true);
    const timerId = setTimeout(() => {
      setErrorSubmit(false);
    }, 3000);

    return () => clearTimeout(timerId);
  };

  const addComments = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm();

    setError(prev => ({ ...prev, ...newErrors }));

    if (newErrors.name || newErrors.email || newErrors.body) {
      return;
    }

    if (postId) {
      const newComment = {
        postId: postId,
        name: name,
        email: email,
        body: body,
      };

      setLoading(true);

      postServise
        .postComments(newComment)
        .then(comment => {
          setNewComment(comment as Comment);
          setBody('');
        })
        .catch(() => errorTimeout())
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const reset = () => {
    setName('');
    setEmail('');
    setBody('');
    setError({
      name: false,
      email: false,
      body: false,
    });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(prev => ({ ...prev, name: false }));
    setName(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(prev => ({ ...prev, email: false }));
    setEmail(e.target.value);
  };

  const handleChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError(prev => ({ ...prev, body: false }));
    setBody(e.target.value);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={addComments}>
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
            className={classNames('input', { 'is-danger': error.name })}
            value={name}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {error.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {error.name && (
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
            className={classNames('input', { 'is-danger': error.email })}
            value={email}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {error.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {error.email && (
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
            className={classNames('textarea', { 'is-danger': error.body })}
            value={body}
            onChange={handleChangeBody}
          />
        </div>

        {error.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': loading })}
            disabled={loading}
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
      {errorSubmit && <ErrorNotification errorSubmit={errorSubmit} />}
    </form>
  );
};
