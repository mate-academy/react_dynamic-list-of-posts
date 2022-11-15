import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { NewComment } from '../types/NewComment';

const defaultNewComment = {
  postId: 0,
  name: '',
  email: '',
  body: '',
};

interface Props {
  postId: number;
  addNewComment: (comment: NewComment, postId: number) => Promise<void>
}

export const NewCommentForm: React.FC<Props> = ({ postId, addNewComment }) => {
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [newComment, setNewComment] = useState<NewComment>(defaultNewComment);
  const [commentIsAdding, setCommentIsAdding] = useState(false);

  useEffect(() => {
    setNewComment({ ...newComment, postId });
  }, [postId]);

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newComment.name.trim()) {
      setNameError(true);
    }

    if (!newComment.email.trim()) {
      setEmailError(true);
    }

    if (!newComment.body.trim()) {
      setCommentError(true);
    }

    if (!commentError && !emailError && !nameError) {
      setCommentIsAdding(true);
      addNewComment(newComment, postId)
        .finally(() => {
          setCommentIsAdding(false);
          setNewComment({
            ...newComment,
            body: '',
          });
        });
    }
  };

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameError(false);
    setNewComment({ ...newComment, name: event.target.value });
  };

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setNewComment({ ...newComment, email: event.target.value });
  };

  const bodyChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentError(false);
    setNewComment({ ...newComment, body: event.target.value });
  };

  const clear = () => {
    setNewComment({
      ...defaultNewComment,
      postId,
    });
    setCommentError(false);
    setEmailError(false);
    setNameError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={formSubmitHandler}
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
            className={classNames(
              'input',
              { 'is-danger': nameError },
            )}
            value={newComment.name}
            onChange={nameChangeHandler}
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': emailError },
            )}
            value={newComment.email}
            onChange={emailChangeHandler}
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
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames(
              'textarea',
              { 'is-danger': commentError },
            )}
            value={newComment.body}
            onChange={bodyChangeHandler}
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
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': commentIsAdding },
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
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
