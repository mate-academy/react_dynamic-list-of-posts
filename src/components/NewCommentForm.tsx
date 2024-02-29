import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { client } from '../utils/fetchClient';
import { Context } from './Store';
import { Comment } from '../types/Comment';

interface Props {
  postId: number;
}

export const NewCommentForm: React.FC<Props> = React.memo(({ postId }) => {
  const { setComments } = useContext(Context);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [hasErrorName, setHasErrorName] = useState(false);
  const [hasErrorEmail, setHasErrorEmail] = useState(false);
  const [hasErrorBody, setHasErrorBody] = useState(false);
  const [bodyErrorType, setBodyErrorType] = useState('Enter some text');
  const [creating, setCreating] = useState(false);
  const [errorCreating, setErrorCreating] = useState('');

  const reset = () => {
    setName('');
    setEmail('');
    setBody('');
    setHasErrorName(false);
    setHasErrorEmail(false);
    setHasErrorBody(false);
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasErrorName(false);
    setName(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasErrorEmail(false);
    setEmail(event.target.value);
  };

  const handleBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (body.trim().length === 0 && bodyErrorType === 'Enter some text') {
      setHasErrorBody(false);
    }

    if (body.trim().length > 20) {
      setHasErrorBody(false);
    }

    setBody(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setHasErrorName(!name);
    setHasErrorEmail(!email);

    if (body.trim().length <= 20) {
      setHasErrorBody(true);
      setBodyErrorType(
        body.trim().length === 0
          ? 'Enter some text'
          : 'Text must be longer than 20 characters',
      );

      return;
    }

    if (!name.trim() || !email.trim() || !body.trim()) {
      return;
    }

    const newComment = {
      postId,
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
    };

    setCreating(true);
    setErrorCreating('');

    client
      .post<Comment>(`/comments`, newComment)
      .then(comment => {
        setComments(current => [...current, comment]);
        reset();
      })
      .catch(() => setErrorCreating('Unable to add comment'))
      .finally(() => setCreating(false));
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (errorCreating) {
      timerId = setTimeout(() => {
        setErrorCreating('');
      }, 3000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [errorCreating]);

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
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
            className={cn('input', { 'is-danger': hasErrorName })}
            value={name}
            onChange={handleName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className={cn('icon is-small is-right', {
              'has-text-danger': hasErrorName,
            })}
            data-cy="ErrorIcon"
          >
            {hasErrorName && <i className="fas fa-exclamation-triangle" />}
          </span>
        </div>

        {hasErrorName && (
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
            className={cn('input', { 'is-danger': hasErrorEmail })}
            value={email}
            onChange={handleEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className={cn('icon is-small is-right', {
              'has-text-danger': hasErrorEmail,
            })}
            data-cy="ErrorIcon"
          >
            {hasErrorEmail && <i className="fas fa-exclamation-triangle" />}
          </span>
        </div>

        {hasErrorEmail && (
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
            className={cn('textarea', { 'is-danger': hasErrorBody })}
            value={body}
            onChange={handleBody}
          />
        </div>

        {hasErrorBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {bodyErrorType}
          </p>
        )}
      </div>

      <div className="button-wrapper">
        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={cn('button is-link', { 'is-loading': creating })}
              onClick={onSubmit}
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

        <div
          className={cn('error-creating', {
            'error-creating--open': errorCreating,
          })}
        >
          {errorCreating}
        </div>
      </div>
    </form>
  );
});
