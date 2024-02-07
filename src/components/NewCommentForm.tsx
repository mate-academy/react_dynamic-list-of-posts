import React, { useState } from 'react';
import cn from 'classnames';
import * as clientComments from '../service/comment';
import { Comment } from '../types/Comment';

type Props = {
  createComment: (comment: Comment) => void
};

export const NewCommentForm: React.FC<Props> = ({ createComment }) => {
  const [nameText, setNameText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const addComment = ({
    postId, name, email, body,
  }: Omit<Comment, 'id'>) => {
    setIsLoading(true);

    if (nameText.length === 0) {
      setNameError(true);
    }

    if (emailText.length === 0) {
      setEmailError(true);
    }

    if (commentText.length === 0) {
      setCommentError(true);
    }

    if (!nameError && !emailError && !commentError) {
      clientComments.createComment({
        postId, name, email, body,
      })
        .then(createComment)
        .finally(() => {
          setNameText('');
          setEmailText('');
          setCommentText('');
        });
    }
  };

  const changeNameText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameText(event.target.value);
  };

  const changeEmailText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailText(event.target.value);
  };

  const changeCommentText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        addComment({
          postId: +new Date(),
          name: nameText,
          email: emailText,
          body: commentText,
        });
      }}
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
            onChange={changeNameText}
            value={nameText}
            placeholder="Name Surname"
            className="input is-danger"
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

        <p className="help is-danger" data-cy="ErrorMessage">
          Name is required
        </p>
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            onChange={changeEmailText}
            value={emailText}
            id="comment-author-email"
            placeholder="email@test.com"
            className="input is-danger"
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

        <p className="help is-danger" data-cy="ErrorMessage">
          Email is required
        </p>
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            onChange={changeCommentText}
            value={commentText}
            placeholder="Type comment here"
            className="textarea is-danger"
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
            className={cn('button', 'is-link', {
              'is-loading': isLoading,
            })}
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
