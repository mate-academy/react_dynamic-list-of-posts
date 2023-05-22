import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import { addComments } from '../api/posts';
import { Comment } from '../types/Comment';

type Props = {
  onAdd(comment: Comment[] | null): void;
  selectedPostId: number;
  comments: Comment[] | null;
  onError(value: boolean): void
};

export const NewCommentForm: React.FC<Props> = ({
  onAdd,
  selectedPostId,
  comments,
  onError,
}) => {
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [commentValue, setCommentValue] = useState('');

  const addCommentsToServer = (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => {
    setIsLoading(true);
    addComments(postId, name, email, body)
      .then((data) => {
        if (comments) {
          onAdd([...comments, data]);
        } else {
          onAdd([data]);
        }
      })
      .catch(() => onError(true))
      .finally(() => setIsLoading(false));
  };

  const handleNameInputChange = (value: string) => {
    setNameValue(value);

    if (nameValue) {
      setIsNameEmpty(false);
    }
  };

  const handleEmailInputChange = (value: string) => {
    setEmailValue(value);

    if (emailValue) {
      setIsEmailEmpty(false);
    }
  };

  const handleCommentInputChange = (value: string) => {
    setCommentValue(value);

    if (commentValue) {
      setIsCommentEmpty(false);
    }
  };

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nameValue) {
      setIsNameEmpty(true);
    }

    if (!emailValue) {
      setIsEmailEmpty(true);
    }

    if (!commentValue) {
      setIsCommentEmpty(true);
    }

    if (!nameValue || !emailValue || !commentValue) {
      return;
    }

    addCommentsToServer(selectedPostId, nameValue, emailValue, commentValue);
    setCommentValue('');
  };

  const handleReset = () => {
    setNameValue('');
    setEmailValue('');
    setCommentValue('');
    setIsNameEmpty(false);
    setIsEmailEmpty(false);
    setIsCommentEmpty(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(e) => handleCommentSubmit(e)}
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
            className={classNames('input', { 'is-danger': isNameEmpty })}
            value={nameValue}
            onChange={(e) => handleNameInputChange(e.target.value)}
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
            value={emailValue}
            onChange={(e) => handleEmailInputChange(e.target.value)}
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
            className={classNames('textarea', { 'is-danger': isCommentEmpty })}
            value={commentValue}
            onChange={(e) => handleCommentInputChange(e.target.value)}
          />
        </div>

        {isCommentEmpty && (
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
