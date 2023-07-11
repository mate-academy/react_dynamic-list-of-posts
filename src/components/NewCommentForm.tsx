import React, { useState, useCallback, FormEvent } from 'react';
import cn from 'classnames';
import { addComment } from '../api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { ErrorMessage } from '../types/errors';
import { ErrorIcon } from './ErrorIcon';
import { validateEmail } from '../types/validateEmail';

interface Props {
  post: Post | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessage | null>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const NewCommentForm: React.FC<Props> = ({
  post,
  setErrorMessage,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [hasName, setHasName] = useState(true);
  const [hasEmail, setHasEmail] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [hasComment, setHasComment] = useState(true);
  const [isCommentAdding, setIsCommentAdding] = useState(false);

  const addNewComment = useCallback(async () => {
    setIsCommentAdding(true);

    try {
      const newComment: Comment = {
        id: 0,
        postId: post?.id ?? 0,
        name,
        email,
        body: comment,
      };

      const fetchedComment = await addComment(newComment);

      setComment('');
      setComments(prevComments => [...prevComments, fetchedComment]);
    } catch (error) {
      setErrorMessage(ErrorMessage.ADD);
    } finally {
      setIsCommentAdding(false);
      setHasName(true);
      setHasEmail(true);
      setHasComment(true);
    }
  }, [name, email, comment, post, setComments, setErrorMessage]);

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

  const handleNameChange = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    setHasName(true);
  };

  const handleEmailChange = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
    setHasEmail(true);
    setIsEmailValid(true);
  };

  const handleCommentChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setComment(event.currentTarget.value);
    setHasComment(true);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
              'is-danger': !hasName,
            })}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!hasName && <ErrorIcon />}

        </div>

        {!hasName && (
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
              'is-danger': !hasEmail,
            })}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(!hasEmail || !isEmailValid) && (
            <ErrorIcon />
          )}
        </div>

        {(!hasEmail || !isEmailValid) && (
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
              'is-danger': !hasComment,
            })}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>

        {!hasComment
          && (
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
              'is-loading': isCommentAdding,
            })}
            onClick={handleFormSubmit}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
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
