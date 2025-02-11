import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';
import { useCreateComment } from '../utils/hooks';

type Props = {
  postId: number;
  onSubmit: (newComment: Comment) => void;
  onError: (str: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onSubmit,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [titleVal, setTitleVal] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [emailVal, setEmailVal] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [commentVal, setCommentVal] = useState('');
  const [hasCommentError, setHasCommentError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTitleError(false);
    setTitleVal(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasEmailError(false);
    setEmailVal(event.target.value);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setHasCommentError(false);
    setCommentVal(event.target.value);
  };

  const { comment, createComment } = useCreateComment(onError, setIsLoading);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!titleVal);
    setHasEmailError(!emailVal);
    setHasCommentError(!commentVal);

    if (!titleVal || !emailVal || !commentVal) {
      return;
    }

    const newComment: Comment = {
      id: 0,
      postId: postId,
      name: titleVal.trim(),
      email: emailVal.trim(),
      body: commentVal.trim(),
    };

    createComment(newComment);
  };

  useEffect(() => {
    if (comment) {
      onSubmit(comment);
      setCommentVal('');
    }
  }, [comment]);

  const handleReset = () => {
    setTitleVal('');
    setEmailVal('');
    setCommentVal('');
    setHasTitleError(false);
    setHasEmailError(false);
    setHasCommentError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
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
            className={cn('input', { 'is-danger': hasTitleError })}
            value={titleVal}
            onChange={handleTitleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasTitleError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasTitleError && (
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
            className={cn('input', { 'is-danger': hasEmailError })}
            value={emailVal}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailError && (
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
            className={cn('textarea', { 'is-danger': hasCommentError })}
            value={commentVal}
            onChange={handleCommentChange}
          />
        </div>

        {hasCommentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          {/* <button type="submit" className="button is-link is-loading"> */}
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
