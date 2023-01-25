import React, { FormEvent, useState } from 'react';
import cn from 'classnames';
import { postComment } from '../utils/api';
import { Comment } from '../types';

type Props = {
  postId: number
  setComments: (updatedComments: Comment[]) => void
  comments: Comment[]
  setError: () => void
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

  const isRequired = (part: string, isOk: boolean) => !part && !isOk;

  const comment: Comment = {
    name,
    email,
    body,
    postId,
    id: Infinity, // Date.now(),
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsNameOk(false);
    setIsEmailOk(false);
    setIsBodyOk(false);

    if (name && email && body) {
      setIsLoading(true);

      try {
        await postComment(comment);
        setComments([...comments, comment]);
      } catch {
        setError();
      } finally {
        setIsLoading(false);
        setIsBodyOk(true);
        setBody('');
      }
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setIsNameOk(true);
    setIsEmailOk(true);
    setIsBodyOk(true);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={onSubmit}
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
              'is-danger': isRequired(name, isNameOk),
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isRequired(name, isNameOk) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isRequired(name, isNameOk) && (
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
              'is-danger': isRequired(email, isEmailOk),
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isRequired(email, isEmailOk) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isRequired(email, isEmailOk) && (
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
              'is-danger': isRequired(body, isBodyOk),
            })}
          />
        </div>

        {isRequired(body, isBodyOk) && (
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
