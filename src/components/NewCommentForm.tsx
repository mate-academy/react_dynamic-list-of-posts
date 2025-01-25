import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';

interface NewCommentFormProps {
  postId?: number;
  handleAddComment: (newComment: Comment, postId: number) => Promise<void>;
}

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  handleAddComment,
  postId,
}) => {
  const [nameQuery, setNameQuery] = useState('');
  const [emailQuery, setEmailQuery] = useState('');
  const [bodyQuery, setBodyQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isBodyEmpty, setIsBodyEmpty] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (nameQuery === '') {
      setIsNameEmpty(true);
    }

    if (emailQuery === '') {
      setIsEmailEmpty(true);
    }

    if (bodyQuery === '') {
      setIsBodyEmpty(true);
    }

    if (postId !== undefined && !isNameEmpty && !isEmailEmpty && !isBodyEmpty) {
      setIsLoading(true);

      handleAddComment(
        {
          name: nameQuery,
          email: emailQuery,
          body: bodyQuery,
        } as Comment,
        postId,
      ).finally(() => {
        setBodyQuery('');
        setIsLoading(false);
      });
    }
  };

  const handleClear = () => {
    setNameQuery('');
    setEmailQuery('');
    setBodyQuery('');

    setIsNameEmpty(false);
    setIsEmailEmpty(false);
    setIsBodyEmpty(false);
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
            className={classNames('input', { 'is-danger': isNameEmpty })}
            value={nameQuery}
            onChange={event => {
              setNameQuery(event.target.value);
              setIsNameEmpty(false);
            }}
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
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': isEmailEmpty })}
            value={emailQuery}
            onChange={event => {
              setEmailQuery(event.target.value);
              setIsEmailEmpty(false);
            }}
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
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': isBodyEmpty })}
            value={bodyQuery}
            onChange={event => {
              setBodyQuery(event.target.value);
              setIsBodyEmpty(false);
            }}
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
