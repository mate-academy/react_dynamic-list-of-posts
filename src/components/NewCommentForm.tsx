import React, { Dispatch, SetStateAction, useState } from 'react';
import classNames from 'classnames';
import { addComment } from '../utils/RESTmethods';
import { CommentInt } from '../types/CommentInt';

type NewCommentFormProps = {
  postId: number,
  setComments: Dispatch<SetStateAction<CommentInt[]>>,
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  postId,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [isNameAllright, setIsNameAllright] = useState(true);
  const [isEmailAllright, setIsEmailAllright] = useState(true);
  const [isBodyAllright, setIsBodyAllright] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim() && body.trim() && email.trim()) {
      setIsLoading(true);

      addComment({
        postId,
        name,
        email,
        body,
      })
        .then(res => {
          setComments(prevCom => [...prevCom, res]);
          setBody('');
        })
        .finally(() => setIsLoading(false));
    }

    if (!name.trim()) {
      setIsNameAllright(false);
    }

    if (!body.trim()) {
      setIsBodyAllright(false);
    }

    if (!email.trim()) {
      setIsEmailAllright(false);
    }
  };

  const handleClear = () => {
    setBody('');
    setName('');
    setEmail('');
    setIsNameAllright(true);
    setIsEmailAllright(true);
    setIsBodyAllright(true);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            value={name}
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': !isNameAllright,
            })}
            onChange={(e) => {
              setName(e.target.value);
              setIsNameAllright(true);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!isNameAllright && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isNameAllright && (
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
            value={email}
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': !isEmailAllright,
            })}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailAllright(true);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!isEmailAllright && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isEmailAllright && (
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
            value={body}
            className={classNames('textarea', {
              'is-danger': !isBodyAllright,
            })}
            onChange={(e) => {
              setBody(e.target.value);
              setIsBodyAllright(true);
            }}
          />
        </div>

        {!isBodyAllright && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
