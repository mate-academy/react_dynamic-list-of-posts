import classNames from 'classnames';
import React, { useState } from 'react';
import { postComment } from '../client/clientMethods';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
  setComments: React.Dispatch<React.SetStateAction<Comment[] | null>>;
  comments: Comment[] | null;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddDeleteError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  setComments,
  comments,
  setIsError,
  setIsAddDeleteError,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isBodyError, setIsBodyError] = useState<boolean>(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);
    let count = 0;

    if (name.trim().length === 0) {
      setIsNameError(true);
      count++;
    }

    if (email.trim().length === 0 || !email.includes('@')) {
      setIsEmailError(true);
      count++;
    }

    if (body.trim().length === 0) {
      setIsBodyError(true);
      count++;
    }

    if (count !== 0) {
      setIsLoading(false);

      return;
    } else {
      const postId = selectedPost.id;

      postComment({ postId, name, email, body })
        .then(com => {
          if (comments?.length !== 0 && comments) {
            setComments([...comments, com]);
          } else {
            setComments([com]);
          }

          setBody('');
        })
        .catch(() => {
          setIsError(true);
          setIsAddDeleteError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }

  function onClear(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsError(false);
    setIsNameError(false);
    setIsBodyError(false);
    setIsEmailError(false);
    setBody('');
    setEmail('');
    setName('');
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsError(false);
    setIsNameError(false);
    setName(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsError(false);
    setIsEmailError(false);
    setEmail(e.target.value);
  }

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setIsError(false);
    setIsBodyError(false);
    setBody(e.target.value);
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={e => onSubmit(e)}>
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
            className={classNames('input', { 'is-danger': isNameError })}
            value={name}
            onChange={e => handleNameChange(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            className={classNames('input', { 'is-danger': isEmailError })}
            value={email}
            onChange={e => handleEmailChange(e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
            className={classNames('textarea', { 'is-danger': isBodyError })}
            value={body}
            onChange={e => handleTextChange(e)}
          />
        </div>

        {isBodyError && (
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
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={e => onClear(e)}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
