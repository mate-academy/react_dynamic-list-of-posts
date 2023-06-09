import classNames from 'classnames';
import React, { useState } from 'react';

type Prop = {
  createComment: (name: string, email: string, comment: string) => void,
};

export const NewCommentForm: React.FC<Prop> = ({ createComment }) => {
  const [name, setName] = useState<string | null>(null);
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [comment, setComment] = useState<string | null>(null);
  const [commentError, setCommentError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name) {
      setNameError(true);
    }

    if (!email) {
      setEmailError(true);
    }

    if (!comment) {
      setCommentError(true);
    }

    if (nameError || emailError || commentError) {
      return;
    }

    setLoading(true);
    if (name && email && comment) {
      createComment(name, email, comment);
    }

    setLoading(false);
    setComment(null);
  };

  return (
    <form data-cy="NewCommentForm">
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
            className={classNames(
              'input',
              { 'is-danger': nameError },
            )}
            value={name ?? ''}
            onChange={(event) => {
              setName(event.target.value);
              setNameError(false);
            }}
          />

          {nameError
            ? (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )
            : (
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            ) }
        </div>

        {nameError
        && (
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
            className={classNames(
              'input',
              { 'is-danger': emailError },
            )}
            value={email ?? ''}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError(false);
            }}
          />

          {emailError
            ? (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )
            : (
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            ) }
        </div>

        {emailError
        && (
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
            className={classNames(
              'textarea',
              { 'is-danger': commentError },
            )}
            value={comment ?? ''}
            onChange={(event) => {
              setComment(event.target.value);
              setCommentError(false);
            }}
          />
        </div>

        {commentError && (
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
              'button',
              'is-link',
              { 'is-loading': loading },
            )}
            onClick={handlerSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              setNameError(false);
              setEmailError(false);
              setCommentError(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
