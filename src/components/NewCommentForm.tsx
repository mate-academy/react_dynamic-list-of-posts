/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { SetStateAction, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import * as apiClient from '../api/api';
import classNames from 'classnames';

type Props = {
  post: Post;
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
  setIsErrorShown: (isErrorShown: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  post,
  setComments,
  setIsErrorShown,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isBodyInvalid, setIsBodyInvalid] = useState(false);
  const [isAddCommentLoading, setIsAddCommentLoading] = useState(false);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNameInvalid) {
      setIsNameInvalid(false);
    }

    setName(event.target.value.trimStart());
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isEmailInvalid) {
      setIsEmailInvalid(false);
    }

    setEmail(event.target.value.trimStart());
  };

  const onBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isBodyInvalid) {
      setIsBodyInvalid(false);
    }

    setBody(event.target.value.trimStart());
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBody = body.trim();

    setIsNameInvalid(!trimmedName);
    setIsEmailInvalid(!trimmedEmail);
    setIsBodyInvalid(!trimmedBody);

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
    setIsNameInvalid(false);
    setIsEmailInvalid(false);
    setIsBodyInvalid(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit} onReset={onReset}>
      {/* Name field */}
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
              'is-danger': isNameInvalid,
            })}
            value={name}
            onChange={onNameChange}
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

      {/* Email field */}
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
              'is-danger': isEmailInvalid,
            })}
            value={email}
            onChange={onEmailChange}
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

      {/* Body field */}
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
              'is-danger': isBodyInvalid,
            })}
            value={body}
            onChange={onBodyChange}
          />
        </div>
        {isBodyInvalid && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {/* Buttons */}
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
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
