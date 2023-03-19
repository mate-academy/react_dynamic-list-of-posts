import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  onFormSubmit: (comment: CommentData) => void,
  isResponse: boolean,
  currentPostId: number,
};

export const NewCommentForm: React.FC<Props> = ({
  onFormSubmit,
  isResponse,
  currentPostId,
}) => {
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmit(true);
    if (!author.trim() || !email.trim() || !comment.trim()) {
      return;
    }

    const newComment = {
      postId: currentPostId,
      name: author,
      email,
      body: comment,
    };

    setIsLoading(true);
    setComment(' ');
    onFormSubmit(newComment);
    setIsSubmit(false);
  };

  const clickHandler = () => {
    setAuthor('');
    setEmail('');
    setComment('');
    setIsSubmit(false);
  };

  const errorInputAuthor = isSubmit && !author.trim();
  const errorInputEmail = isSubmit && !email.trim();
  const errorTextComment = isSubmit && !comment.trim();

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={submitHandler}
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
            className={classNames('input', { 'is-danger': errorInputAuthor })}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorInputAuthor && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorInputAuthor && (
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
            className={classNames('input', { 'is-danger': errorInputEmail })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorInputEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorInputEmail && (
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
              'textarea', { 'is-danger': errorTextComment },
            )}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {errorTextComment && (
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
              'button is-link', {
                'is-loading': isLoading && !isResponse,
              },
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
            onClick={clickHandler}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
