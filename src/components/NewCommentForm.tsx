import React, { useState } from 'react';
import { Status } from '../types/Status';
import classNames from 'classnames';
import { Comment, CommentData } from '../types/Comment';
import * as httpService from '../api/HttpClient';
import { Post } from '../types/Post';

interface Props {
  selectedPost: Post;
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const NewCommentForm: React.FC<Props> = ({
  selectedPost,
  status,
  setStatus,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = event.target.value;

    if (name !== nameValue) {
      setNameError(false);
    }

    setName(nameValue);
  };

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;

    if (email !== emailValue) {
      setEmailError(false);
    }

    setEmail(emailValue);
  };

  const handleCommentInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const commentValue = event.target.value;

    if (commentText !== commentValue) {
      setCommentError(false);
    }

    setCommentText(commentValue);
  };

  const clearErrors = () => {
    setNameError(false);
    setEmailError(false);
    setCommentError(false);
  };

  const addPost = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setStatus(Status.Loading);

    const emptyFields =
      name.trim() === '' && email.trim() === '' && commentText.trim() === '';

    if (emptyFields) {
      setNameError(true);
      setEmailError(true);
      setCommentError(true);
      setStatus(Status.IDLE);

      return;
    }

    if (name.trim() === '') {
      setNameError(true);

      return;
    }

    if (email.trim() === '') {
      setEmailError(true);

      return;
    }

    if (commentText.trim() === '') {
      setCommentError(true);

      return;
    }

    try {
      const newComment: CommentData = {
        postId: selectedPost.id,
        name: name,
        email: email,
        body: commentText,
      };

      const comment: Comment = await httpService.addComment(newComment);

      setComments((currentComments: Comment[]) => {
        return [...currentComments, comment];
      });
      setStatus(Status.Success);
      clearErrors();
      setCommentText('');
    } catch (error) {
      setStatus(Status.Error);
    }
  };

  const clear = () => {
    setStatus(Status.IDLE);
    clearErrors();
    setName('');
    setEmail('');
    setCommentText('');
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
            className={classNames('input', {
              'is-danger': nameError,
            })}
            value={name}
            onChange={handleNameInput}
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
            className={classNames('input', {
              'is-danger': emailError,
            })}
            value={email}
            onChange={handleEmailInput}
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
            className={classNames('textarea', {
              'is-danger': commentError,
            })}
            value={commentText}
            onChange={handleCommentInput}
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
            className={classNames('button is-link', {
              'is-loading':
                status === 'loading' &&
                !nameError &&
                !emailError &&
                !commentError,
            })}
            onClick={addPost}
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
