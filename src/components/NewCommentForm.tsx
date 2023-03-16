import React, { FormEvent, useCallback, useState } from 'react';
import classNames from 'classnames';
import { addComment } from '../api/comments';
import { CommentFormErrors, ErrorTypes } from '../constants';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  post: Post | null;
  setErrorType: React.Dispatch<React.SetStateAction<ErrorTypes | null>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  post,
  setComments,
  setErrorType,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [hasName, setHasName] = useState(true);
  const [hasEmail, setHasEmail] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [hasComment, setHasComment] = useState(true);
  const [isCommentAdding, setIsCommentAdding] = useState(false);

  const errorIcon = (
    <span
      className="icon is-small is-right has-text-danger"
      data-cy="ErrorIcon"
    >
      <i className="fas fa-exclamation-triangle" />
    </span>
  );

  const addNewComment = useCallback(async () => {
    setIsCommentAdding(true);

    try {
      const newComment = {
        postId: post?.id,
        name,
        email,
        body: comment,
      };

      const fetchedComment = await addComment(newComment);

      setComment('');
      setComments(prevComments => [...prevComments, fetchedComment]);
    } catch (error) {
      setErrorType(ErrorTypes.ADD);
    } finally {
      setIsCommentAdding(false);
      setHasName(true);
      setHasEmail(true);
      setHasComment(true);
    }
  }, [name, email, comment]);

  const validateEmail = (userEmail: string) => {
    return String(userEmail)
      .toLowerCase()
      .match(
        // eslint-disable-next-line
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    let isNotValid;

    if (!name) {
      setHasName(false);
      isNotValid = true;
    }

    if (!email) {
      setHasEmail(false);
      isNotValid = true;
    }

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      isNotValid = true;
    }

    if (!comment) {
      setHasComment(false);
      isNotValid = true;
    }

    if (isNotValid) {
      return;
    }

    addNewComment();
  };

  const handleClearForm = () => {
    setName('');
    setEmail('');
    setComment('');
    setHasName(true);
    setHasEmail(true);
    setHasComment(true);
    setIsEmailValid(true);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
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
            className={classNames('input', {
              'is-danger': !hasName,
            })}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setHasName(true);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!hasName && (
            errorIcon)}
        </div>

        {!hasName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {CommentFormErrors.NAME}
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
            className={classNames('input', {
              'is-danger': !hasEmail,
            })}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setHasEmail(true);
              setIsEmailValid(true);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(!hasEmail || !isEmailValid) && (
            errorIcon)}
        </div>

        {(!hasEmail || !isEmailValid) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {!hasEmail ? CommentFormErrors.EMAIL : CommentFormErrors.NOTVALID}
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
            className={classNames('textarea', {
              'is-danger': !hasComment,
            })}
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
              setHasComment(true);
            }}
          />
        </div>

        {!hasComment && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {CommentFormErrors.COMMENT}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isCommentAdding,
            })}
            onClick={handleFormSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
