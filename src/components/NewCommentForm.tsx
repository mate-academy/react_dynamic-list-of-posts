import cn from 'classnames';
import React, { useState } from 'react';
import { Comment, IError } from '../types';
import { createComment } from '../utils/api';

type Props = {
  postId: number
  setComments: (updatedComments: Comment[]) => void
  comments: Comment[]
  setError: (error: IError) => void
};

export const NewCommentForm: React.FC<Props> = ({
  postId, setComments, comments, setError,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isNameOk, setIsNameOk] = useState(true);
  const [isEmailOk, setIsEmailOk] = useState(true);
  const [isBodyOk, setIsBodyOk] = useState(true);

  const isNameEmpty = !name && !isNameOk;
  const isEmailEmpty = !email && !isEmailOk;
  const isBodyEmpty = !body && !isBodyOk;
  const id = Math.max(...comments.map(comm => comm.id + 1), 1);

  const postComment = async () => {
    if (name && email && body) {
      setIsLoading(true);
      setError(IError.None);

      const comment: Comment = {
        name,
        email,
        body,
        postId,
        id,
      };

      try {
        await createComment(comment);
        setComments([...comments, comment]);
        setIsLoading(false);
      } catch {
        setError(IError.Add);
      } finally {
        setIsLoading(false);
        setIsBodyOk(true);
        setBody('');
      }
    } else {
      setIsNameOk(false);
      setIsEmailOk(false);
      setIsBodyOk(false);
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setIsNameOk(true);
    setIsEmailOk(true);
    setIsBodyOk(true);
    setError(IError.None);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        postComment();
      }}
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
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setIsNameOk(true);
            }}
            className={cn('input', {
              'is-danger': isNameEmpty,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameEmpty && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameEmpty && (
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
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setIsEmailOk(true);
            }}
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': isEmailEmpty,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailEmpty && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailEmpty && (
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
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
              setIsBodyOk(true);
            }}
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': isBodyEmpty,
            })}
          />
        </div>

        {isBodyEmpty && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
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
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
