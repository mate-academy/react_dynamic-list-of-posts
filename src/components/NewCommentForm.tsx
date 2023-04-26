import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';

type Props = {
  updateComments: (
    name: string,
    email: string,
    bodyComment: string,
  ) => Promise<void | Comment>
};

export const NewCommentForm: React.FC<Props> = ({
  updateComments,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [newComment, setNewComment] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const errorSetter = (
    field: string,
    setter: (value: boolean) => void,
  ) => {
    if (!field.trim()) {
      setter(true);
    } else {
      setter(false);
    }
  };

  const clearForm = () => {
    setAuthorName('');
    setAuthorEmail('');
    setNewComment('');
    setNameError(false);
    setEmailError(false);
    setCommentError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (authorName && authorEmail && newComment) {
      updateComments(
        authorName,
        authorEmail,
        newComment,
      ).finally(() => {
        setIsLoading(false);
        setNewComment('');
      });
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={clearForm}
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
            className={classNames(
              'input',
              { 'is-danger': nameError },
            )}
            value={authorName}
            onChange={(event) => {
              setNameError(false);
              setAuthorName(event.target.value);
            }}
            onBlur={() => errorSetter(authorName, setNameError)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': emailError },
            )}
            value={authorEmail}
            onChange={(event) => {
              setEmailError(false);
              setAuthorEmail(event.target.value);
            }}
            onBlur={() => errorSetter(authorEmail, setEmailError)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
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
            value={newComment}
            onChange={(event) => {
              setCommentError(false);
              setNewComment(event.target.value);
            }}
            onBlur={() => errorSetter(newComment, setCommentError)}
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
              { 'is-loading': isLoading },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
