import React, { useState } from 'react';
import { createComment } from '../api/commentsApi';
import { Comments } from '../types/Comment';
import classNames from 'classnames';

type NewCmt = {
  currentPost: number;
  onAdd: (comment: Comments) => void;
  setError: (value: string) => void;
};

export const NewCommentForm: React.FC<NewCmt> = ({
  currentPost,
  onAdd,
  setError,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorBody, setErrorBody] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isNameError = name.trim() === '';
    const isEmailError = email.trim() === '';
    const isBodyError = body.trim() === '';

    setErrorName(isNameError);
    setErrorEmail(isEmailError);
    setErrorBody(isBodyError);

    if (isNameError || isEmailError || isBodyError) {
      return;
    }

    try {
      setIsLoading(true);

      const newComment = await createComment({
        name,
        email,
        body,
        postId: currentPost,
      });

      onAdd(newComment);

      setBody('');
    } catch (err) {
      setError(`Something goes wrong ! ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrorName(false);
    setErrorEmail(false);
    setErrorBody(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
              'is-danger': errorName,
            })}
            value={name}
            onChange={e => {
              setName(e.target.value);
              setErrorName(false);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errorName && (
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
              'is-danger': errorEmail,
            })}
            value={email}
            onChange={e =>{
              setEmail(e.target.value);
              setErrorEmail(false);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
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
              'is-danger': errorBody,
            })}
            value={body}
            onChange={e => {
              setBody(e.target.value);
              setErrorBody(false);
            }}
          />
        </div>
        {errorBody && (
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
