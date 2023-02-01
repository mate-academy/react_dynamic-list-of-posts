import React, { useState } from 'react';
import cn from 'classnames';
import { postComment } from './API/Comments';

type Props = {
  postId: number;
  onCommentPost: (postingState: boolean) => void
  isPostingComment: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onCommentPost,
  isPostingComment,
}) => {
  const [isSubmited, setIsSubmited] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const ValidEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$',
  );

  const nameError = isSubmited && !authorName.length;
  const emailError = (
    isSubmited
    && !ValidEmail.test(authorEmail)
  );
  const textError = isSubmited && !commentBody.length;

  const commentIsValid = (
    !nameError
    && !emailError
    && !textError
  );

  const newComment = {
    id: 0,
    postId,
    name: authorName,
    email: authorEmail,
    body: commentBody,
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmited(true);

    if (commentIsValid) {
      onCommentPost(true);
      postComment(newComment)
        .finally(() => {
          onCommentPost(false);
          setCommentBody('');
          setIsSubmited(false);
        });
    }
  };

  const onReset = () => {
    setIsSubmited(false);
    setAuthorName('');
    setAuthorEmail('');
    setCommentBody('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={onSubmit}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={authorName}
            onChange={(event) => {
              setAuthorName(event.target.value);
            }}
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn(
              'input',
              { 'is-danger': nameError },
            )}
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
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
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
            value={authorEmail}
            onChange={(event) => {
              setAuthorEmail(event.target.value);
            }}
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn(
              'input',
              { 'is-danger': emailError },
            )}
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
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
            Please Enter a valid E-mail(ex: 123@any.com)
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
            value={commentBody}
            onChange={(event) => {
              setCommentBody(event.target.value);
            }}
            placeholder="Type comment here"
            className={cn(
              'input',
              { 'is-danger': textError },
            )}
          />
        </div>

        {textError && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn(
              'button is-link',
              { 'is-loading': isPostingComment },
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
            onClick={onReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
