/* eslint-disable prettier/prettier */
import React, { ChangeEventHandler, useState } from 'react';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

interface Props {
  postId: number | undefined;
  comments: Comment[] | null;
  addNewComment: (comments: Comment[]) => void;
  onAddingError: (isError: boolean) => void;
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  comments,
  addNewComment,
  onAddingError,
}) => {
  const [fullname, setFullName] = useState('');
  const [isNameError, setIsNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);

  const [comment, setComment] = useState('');
  const [isCommentError, setIsCommentError] = useState(false);

  const [isAdding, setIsAdding] = useState(false);

  const nameHandler: ChangeEventHandler<HTMLInputElement> = event => {
    setFullName(event.target.value);

    if (isNameError) {
      setIsNameError(false);
    }
  };

  const emailHandler: ChangeEventHandler<HTMLInputElement> = event => {
    setEmail(event.target.value);

    if (isEmailError) {
      setIsEmailError(false);
    }
  };

  const commentHandler: ChangeEventHandler<HTMLTextAreaElement> = event => {
    setComment(event.target.value);

    if (isCommentError) {
      setIsCommentError(false);
    }
  };

  const isNotValid = (
    trimmedFullName: string,
    trimmedEmail: string,
    trimmedComment: string,
  ) => {
    const emailValidation =
      trimmedEmail.includes('@') && email.trim().split('@');

    if (!trimmedFullName) {
      setIsNameError(true);
    }

    if (
      !emailValidation ||
      !emailValidation[0].length ||
      !emailValidation[1].length ||
      !emailValidation[1].includes('.com')
    ) {
      setIsEmailError(true);
    }

    if (!trimmedComment) {
      setIsCommentError(true);
    }

    return (
      isNameError ||
      isEmailError ||
      isCommentError ||
      !trimmedFullName ||
      !trimmedEmail ||
      !trimmedComment
    );
  };

  const submitHandler: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault();
    const trimmedFullName = fullname.trim();
    const trimmedEmail = email.trim();
    const trimmedComment = comment.trim();

    if (isNotValid(trimmedFullName, trimmedEmail, trimmedComment)) {
      return;
    }

    setIsAdding(true);
    client
      .post<Comment>('/comments', {
      postId,
      body: comment,
      name: fullname,
      email: email,
    })
      .then(newComment => {
        setComment('');
        addNewComment([...(comments || []), newComment]);
      })
      .catch(() => {
        onAddingError(true);
      })
      .finally(() => setIsAdding(false));
  };

  const reset = () => {
    setFullName('');
    setEmail('');
    setComment('');

    setIsNameError(false);
    setIsEmailError(false);
    setIsCommentError(false);
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
            value={fullname}
            onChange={nameHandler}
            className={classNames(`input`, { 'is-danger': isNameError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {isNameError && (
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
            value={email}
            onChange={emailHandler}
            className={classNames(`input`, { 'is-danger': isEmailError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
            value={comment}
            onChange={commentHandler}
            className={classNames(`textarea`, { 'is-danger': isCommentError })}
          />
        </div>

        {isCommentError && (
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
              'is-loading': isAdding,
            })}
            onClick={submitHandler}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
