import cn from 'classnames';
import React, { useState } from 'react';
import { addComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  currentPostId: number,
  onCommentAdd: React.Dispatch<React.SetStateAction<Comment[]>>,
  onError: (hasError: boolean) => void,
};

const defaultState = { value: '', hasError: false };

export const NewCommentForm: React.FC<Props> = ({
  currentPostId,
  onCommentAdd,
  onError,
}) => {
  const [name, setName] = useState(defaultState);
  const [email, setEmail] = useState(defaultState);
  const [body, setBody] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    onError(false);

    const trimmedName = name.value.trim();
    const trimmedEmail = email.value.trim();
    const trimmedBody = body.value.trim();

    if (trimmedName === '') {
      setName(prevName => ({ ...prevName, hasError: true }));
    }

    if (trimmedEmail === '') {
      setEmail(prevName => ({ ...prevName, hasError: true }));
    }

    if (trimmedBody === '') {
      setBody(prevName => ({ ...prevName, hasError: true }));
    }

    if (trimmedName === '' || trimmedEmail === '' || trimmedBody === '') {
      setIsLoading(false);

      return;
    }

    addComment({
      postId: currentPostId,
      name: trimmedName,
      email: trimmedEmail,
      body: trimmedBody,
    })
      .then(res => {
        if ('error' in res) {
          throw new Error();
        }

        onCommentAdd(prevComms => [...prevComms, res]);
        setBody({ value: '', hasError: false });
      })
      .catch(() => onError(true))
      .finally(() => setIsLoading(false));
  };

  const handleFormClear = () => {
    setName(defaultState);
    setEmail(defaultState);
    setBody(defaultState);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
            className={cn('input', { 'is-danger': name.hasError })}
            value={name.value}
            onChange={
              (e) => setName({ value: e.target.value, hasError: false })
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {name.hasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        {name.hasError && (
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
            className={cn('input', { 'is-danger': email.hasError })}
            value={email.value}
            onChange={
              (e) => setEmail({ value: e.target.value, hasError: false })
            }
          />

          {email.hasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        </div>

        {email.hasError && (
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
            className={cn('textarea', { 'is-danger': body.hasError })}
            value={body.value}
            onChange={
              (e) => setBody({ value: e.target.value, hasError: false })
            }
          />
        </div>

        {body.hasError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleFormClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
