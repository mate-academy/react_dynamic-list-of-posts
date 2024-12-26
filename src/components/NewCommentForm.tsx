import React, { Dispatch, SetStateAction, useState } from 'react';
import * as commentsService from '../api/comments';
import cn from 'classnames';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  addNewComment: (comment: Comment) => void;
  setIsError: (isError: boolean) => void;
  setIsAddingComment: Dispatch<SetStateAction<boolean>>;
};

export const NewCommentForm: React.FC<Props> = props => {
  const { postId, addNewComment, setIsError, setIsAddingComment } = props;
  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [isCommentError, setIsCommentError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setIsNameError(false);
    setIsEmailError(false);
    setIsCommentError(false);
    setName('');
    setEmail('');
    setCommentText('');
    setIsLoading(false);
  };

  const validateForm = () => {
    setIsNameError(!name.length);
    setIsEmailError(!email.length);
    setIsCommentError(!commentText.length);

    return !name.length || !email.length || !commentText.length;
  };

  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      const newComment = await commentsService.createComment({
        postId,
        name,
        email,
        body: commentText,
      });

      setIsError(false);
      addNewComment(newComment);

      setCommentText('');
    } catch (error) {
      setIsError(true);
      setIsAddingComment(false);
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNameError(false);
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailError(false);
    setEmail(event.target.value);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setIsCommentError(false);
    setCommentText(event.target.value);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleAddComment}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={name}
            onChange={handleNameChange}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': isNameError })}
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
            value={email}
            onChange={handleEmailChange}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': isEmailError })}
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
            value={commentText}
            onChange={handleCommentChange}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': isCommentError })}
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
            className={cn('button is-link', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            onClick={reset}
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
