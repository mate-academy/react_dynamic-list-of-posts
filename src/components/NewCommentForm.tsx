/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';
import { createComment } from '../api/comments';

interface Props {
  postId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const NewCommentForm: React.FC<Props> = ({ postId, setComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isCommentInvalid, setIsCommentInvalid] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const changeName = (value: string) => {
    if (value.trim() !== '') {
      setIsNameInvalid(false);
    }

    setName(value);
  };

  const changeEmail = (value: string) => {
    if (value.trim() !== '') {
      setIsEmailInvalid(false);
    }

    setEmail(value);
  };

  const changeComment = (value: string) => {
    if (value.trim() !== '') {
      setIsCommentInvalid(false);
    }

    setComment(value);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setComment('');
    setIsNameInvalid(false);
    setIsEmailInvalid(false);
    setIsCommentInvalid(false);
  };

  const submitForm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const nameValue = name.trim();
    const emailValue = email.trim();
    const commentValue = comment.trim();

    if (nameValue === '') {
      setIsNameInvalid(true);
    }

    if (emailValue === '') {
      setIsEmailInvalid(true);
    }

    if (commentValue === '') {
      setIsCommentInvalid(true);
    }

    if (nameValue !== '' && emailValue !== '' && commentValue !== '') {
      setIsBtnLoading(true);
      createComment({
        postId,
        name,
        email,
        body: comment,
      })
        .then((createdComment) => {
          setComments((prevState) => [...prevState, createdComment]);
          setComment('');
        })
        .catch()
        .finally(() => {
          setIsBtnLoading(false);
          resetForm();
        });
    }
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
            className={cn('input', { 'is-danger': isNameInvalid })}
            value={name}
            onChange={({ target }) => changeName(target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameInvalid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameInvalid && (
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
            className={cn('input', { 'is-danger': isEmailInvalid })}
            value={email}
            onChange={({ target }) => changeEmail(target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailInvalid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailInvalid && (
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
            className={cn('textarea', { 'is-danger': isCommentInvalid })}
            value={comment}
            onChange={({ target }) => changeComment(target.value)}
          />
        </div>

        {isCommentInvalid && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isBtnLoading })}
            onClick={(event) => submitForm(event)}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
