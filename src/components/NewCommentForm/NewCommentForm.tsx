import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { MainContext } from '../MainContext/MainContext';
import { createComments } from '../../api/comments';
import { Errors } from '../../types/Errors';

export const NewCommentForm: React.FC = () => {
  const {
    choosedPost,
    comments,
    setComments,
    setError,
  } = useContext(MainContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isLoadingAddButton, setIsLoadingAddButton] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyBody, setEmptyBody] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoadingAddButton(true);

    if (!name) {
      setIsLoadingAddButton(false);
      setEmptyName(true);
    }

    if (!email) {
      setIsLoadingAddButton(false);
      setEmptyEmail(true);
    }

    if (!body) {
      setIsLoadingAddButton(false);
      setEmptyBody(true);
    }

    if (choosedPost && name && email && body) {
      const newComment = {
        postId: choosedPost.id,
        name,
        email,
        body,
      };

      createComments(newComment)
        .then((createdComment) => {
          if (comments) {
            setComments([...comments, createdComment]);
          }

          setBody('');
        })
        .catch(() => setError(Errors.COMMENT))
        .finally(() => setIsLoadingAddButton(false));
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setEmptyName(false);
    setEmptyEmail(false);
    setEmptyBody(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(e) => handleSubmit(e)}
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
            className={cn('input', {
              'is-danger': !name.length && emptyName,
            })}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setEmptyName(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!name && emptyName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!name && emptyName && (
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
            className={cn('input', {
              'is-danger': !email.length && emptyEmail,
            })}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmptyEmail(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!email && emptyEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!email && emptyEmail && (
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
            className={cn('textarea', {
              'is-danger': !body.length && emptyBody,
            })}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setEmptyBody(false);
            }}
          />
        </div>

        {!body && emptyBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', {
              'is-loading': isLoadingAddButton,
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
