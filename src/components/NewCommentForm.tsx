import React, { useState } from 'react';
import cn from 'classnames';
import * as clientComments from '../service/comment';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  createComment: (comment: Comment) => void
  post: Post
};

export const NewCommentForm: React.FC<Props> = ({ createComment, post }) => {
  const [nameText, setNameText] = useState('');
  const [emailText, setEmailText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setNameText('');
    setEmailText('');
    setCommentText('');
    setNameError(false);
    setEmailError(false);
    setCommentError(false);
    setIsLoading(false);
  };

  const addComment = ({
    postId, name, email, body,
  }: Omit<Comment, 'id'>) => {
    setIsLoading(true);

    clientComments.createComment({
      postId, name, email, body,
    })
      .then(createComment)
      .finally(() => {
        setCommentText('');
        setIsLoading(false);
      });
  };

  const changeNameText = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (nameText.length === 0) {
      setNameError(true);
    }

    setNameError(false);
    setNameText(event.target.value);
  };

  const changeEmailText = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (emailText.length === 0) {
      setEmailError(true);
    }

    setEmailError(false);
    setEmailText(event.target.value);
  };

  const changeCommentText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (commentText.length === 0) {
      setCommentError(true);
    }

    setCommentError(false);
    setCommentText(event.target.value);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isNameValid = nameText.trim();
        const isEmailValid = emailText.trim();
        const isBodyValid = commentText.trim();

        if (!isNameValid) {
          setNameError(true);
        }

        if (!isEmailValid) {
          setEmailError(true);
        }

        if (!isBodyValid) {
          setCommentError(true);
        }

        if (isNameValid && isEmailValid && isBodyValid) {
          addComment({
            postId: post.id,
            name: nameText,
            email: emailText,
            body: commentText,
          });
        }
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
            className={cn('input', {
              'is-danger': nameError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
            </>

          )}

        </div>

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
            className={cn('input', {
              'is-danger': emailError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
            </>
          )}

        </div>

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
            className={cn('textarea', {
              'is-danger': commentError,
            })}
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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
