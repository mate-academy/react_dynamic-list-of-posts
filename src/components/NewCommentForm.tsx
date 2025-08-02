import React, { useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import * as apiClient from '../api/api';
import classNames from 'classnames';

type Props = {
  post: Post;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setIsErrorShown: (isShown: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  post,
  setComments,
  setIsErrorShown,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isBodyValid, setIsBodyValid] = useState(false);

  const [isAddCommentLoading, setIsAddCommentLoading] = useState(false);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNameValid) {
      setIsNameValid(false);
    }

    setName(event.target.value.trimStart());
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isEmailValid) {
      setIsEmailValid(false);
    }

    setEmail(event.target.value.trimStart());
  };

  const onBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isBodyValid) {
      setIsBodyValid(false);
    }

    setBody(event.target.value.trimStart());
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBody = body.trim();

    if (!trimmedName) {
      setIsNameValid(true);
    }

    if (!trimmedEmail) {
      setIsEmailValid(true);
    }

    if (!trimmedBody) {
      setIsBodyValid(true);
    }

    if (!trimmedName || !trimmedEmail || !trimmedBody) {
      return;
    }

    const commentToAdd = {
      postId: post.id,
      name: trimmedName,
      email: trimmedEmail,
      body: trimmedBody,
    };

    setIsAddCommentLoading(true);
    apiClient
      .addComment(commentToAdd)
      .then(createdComment => {
        setComments(current => [...current, createdComment]);
        setBody('');
      })
      .catch(() => setIsErrorShown(true))
      .finally(() => setIsAddCommentLoading(false));
  };

  const onReset = () => {
    setName('');
    setEmail('');
    setBody('');

    setIsNameValid(false);
    setIsEmailValid(false);
    setIsBodyValid(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit} onReset={onReset}>
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
              'is-danger': isNameValid,
            })}
            value={name}
            onChange={onNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {isNameValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameValid && (
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
              'is-danger': isEmailValid,
            })}
            value={email}
            onChange={onEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailValid && (
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
              'is-danger': isBodyValid,
            })}
            value={body}
            onChange={onBodyChange}
          />
        </div>
        {isBodyValid && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isAddCommentLoading,
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
