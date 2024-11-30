import React, { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import * as commentService from '../api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  setComments: Dispatch<SetStateAction<Comment[]>>;
  setHasError: (err: boolean) => void;
  post: Post;
};

export const NewCommentForm: React.FC<Props> = ({
  setComments,
  setHasError,
  post,
}) => {
  //#region states
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  //#endregion

  //#region handlers
  function handleNameChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setName(ev.target.value);
    setHasNameError(false);
  }

  function handleEmailChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setEmail(ev.target.value);
    setHasEmailError(false);
  }

  function handleBodyChange(ev: React.ChangeEvent<HTMLTextAreaElement>) {
    setBody(ev.target.value);
    setHasBodyError(false);
  }
  //#endregion

  //#region submit & reset
  function resetOnSubmit() {
    setBody('');

    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  }

  function resetOnClear() {
    setName('');
    setEmail('');
    setBody('');

    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();

    setHasNameError(!name);
    setHasEmailError(!email);
    setHasBodyError(!body);

    if (!name || !email || !body) {
      return;
    }

    const postId = post.id;

    setIsLoading(true);

    commentService
      .createComment({ postId, name, email, body })
      .then(newComment => {
        setComments(currComments => [...currComments, newComment]);
        resetOnSubmit();
      })
      .catch(error => {
        setHasError(true);
        throw error;
      })
      .finally(() => setIsLoading(false));
  }
  //#endregion

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={name}
            onChange={handleNameChange}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': hasNameError })}
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
            value={email}
            onChange={handleEmailChange}
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': hasEmailError })}
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
            value={body}
            onChange={handleBodyChange}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': hasBodyError })}
          />
        </div>

        {hasBodyError && (
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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetOnClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
