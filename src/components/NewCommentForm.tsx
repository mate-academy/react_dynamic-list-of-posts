import classNames from 'classnames';
import React, { useState } from 'react';
import { createCommentOnPost } from './api/comments';
import { Comment } from '../types/Comment';

type Props = {
  currentPostId: number,
  setComments: (comments: Comment[]) => void,
  comments: Comment[],
  setIsErrorComments: (value: boolean) => void,
};

export const NewCommentForm: React.FC<Props> = ({
  currentPostId,
  setComments,
  comments,
  setIsErrorComments,
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(false);

  const [loader, setLoader] = useState(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(false);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handleChangeComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComment(event.target.value);
    setCommentError(false);
  };

  const handleSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimName = name.trim();
    const trimEmail = email.trim();
    const trimComment = comment.trim();

    setNameError(!trimName);
    setEmailError(!trimEmail);
    setCommentError(!trimComment);

    if (!trimName || !trimEmail || !trimComment) {
      return;
    }

    setLoader(true);

    createCommentOnPost({
      postId: currentPostId,
      name: trimName,
      email: trimEmail,
      body: trimComment,
    })
      .then(newComment => {
        setComments([...comments, newComment]);
        setComment('');
      })
      .catch(() => setIsErrorComments(true))
      .finally(() => setLoader(false));
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setComment('');

    setNameError(false);
    setEmailError(false);
    setCommentError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmitComment}
      onReset={handleReset}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={name}
            onChange={handleChangeName}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': nameError })}
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
            value={email}
            onChange={handleChangeEmail}
            required
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': emailError })}
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
            value={comment}
            onChange={handleChangeComment}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': commentError })}
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
            className={classNames('button is-link', { 'is-loading': loader })}
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
