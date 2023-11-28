import cn from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post,
  addNewComment: (c: Omit<Comment, 'id'>) => void,
  isCommentSubmiting: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  post,
  addNewComment,
  isCommentSubmiting,
}) => {
  const [userName, setUserName] = useState('');
  const [hasUserNameError, setHasUserNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  const handleUserNameChange = (name: string) => {
    setHasUserNameError(false);
    setUserName(name);
  };

  const handleEmailChange = (mail: string) => {
    setHasEmailError(false);
    setEmail(mail);
  };

  const handleBodyChange = (text: string) => {
    setHasBodyError(false);
    setBody(text);
  };

  const handleFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setHasUserNameError(!userName.trim());
    setHasEmailError(!email.trim());
    setHasBodyError(!body.trim());

    if (!userName.trim() || !email.trim() || !body.trim()) {
      return;
    }

    const newComment = {
      postId: post.id,
      name: userName,
      email,
      body,
    };

    addNewComment(newComment);
    setBody('');
  };

  const reset = () => {
    setUserName('');
    setEmail('');
    setBody('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={(ev) => handleFormSubmit(ev)}>
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
            className={cn('input', { 'is-danger': hasUserNameError })}
            value={userName}
            onChange={(ev) => handleUserNameChange(ev.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasUserNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasUserNameError && (
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
            className={cn('input', { 'is-danger': hasEmailError })}
            value={email}
            onChange={(ev) => handleEmailChange(ev.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailError && (
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
            className={cn('textarea', { 'is-danger': hasBodyError })}
            value={body}
            onChange={(ev) => handleBodyChange(ev.target.value)}
          />
        </div>

        {hasBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link',
              { 'is-loading': isCommentSubmiting })}
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
