import classNames from 'classnames';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { addComment } from '../api/api';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  setComments: Dispatch<SetStateAction<Comment[]>>;
  setAddError: Dispatch<SetStateAction<boolean>>;
};

export const NewCommentForm: React.FC<Props> = (
  {
    postId,
    setComments,
    setAddError,
  },
) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [noName, setNoName] = useState(false);
  const [noEmail, setNoEmail] = useState(false);
  const [noBody, setNoBody] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const resetWarnings = () => {
    setNoName(false);
    setNoEmail(false);
    setNoBody(false);
  };

  const clearFields = () => {
    setName('');
    setEmail('');
    setBody('');
    resetWarnings();
  };

  const handleSubmit = () => {
    resetWarnings();
    setAddError(false);

    if (!name.trim()) {
      setNoName(true);
    }

    if (!email.trim()) {
      setNoEmail(true);
    }

    if (!body.trim()) {
      setNoBody(true);
    }

    if (!name.trim() || !email.trim() || !body.trim()) {
      setIsSubmiting(false);

      return;
    }

    setIsSubmiting(true);

    addComment({
      postId,
      name,
      email,
      body,
    })
      .then(result => setComments(prevValue => [...prevValue, result]))
      .catch(() => setAddError(true))
      .finally(() => {
        setIsSubmiting(false);
        setBody('');
      });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={e => e.preventDefault()}>
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
            className={classNames('input', { 'is-danger': noName })}
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {noName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {noName && (
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
            className={classNames('input', { 'is-danger': noEmail })}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {noEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {noEmail && (
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
            className={classNames('textarea', { 'is-danger': noEmail })}
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>

        {noBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link',
              {
                'is-loading': isSubmiting,
              },
            )}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link
            is-light"
            onClick={clearFields}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
