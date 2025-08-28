import cn from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

interface Props {
  addComment: (value: CommentData) => Promise<void>;
  isLoadingForAdd: boolean;
  postId?: number;
}

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  isLoadingForAdd,
  postId = 0,
}) => {
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState<boolean>(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState(false);

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value.trimStart());
    setUserNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value.trimStart());
    setEmailError(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value.trimStart());
    setBodyError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUserNameError(!userName);
    setEmailError(!email);
    setBodyError(!body);

    if (!userName || !email || !body) {
      return;
    }

    const trimedUserName = userName.trim();
    const trimedEmail = email.trim();
    const trimedBody = body.trim();

    addComment({
      postId: postId,
      name: trimedUserName,
      email: trimedEmail,
      body: trimedBody,
    }).then(() => setBody(''));
  };

  const handleReset = () => {
    setUserName('');
    setEmail('');
    setBody('');
    setUserNameError(false);
    setEmailError(false);
    setBodyError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
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
            className={cn('input', { 'is-danger': userNameError })}
            value={userName}
            onChange={handleUserNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {userNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {userNameError && (
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
            className={cn('input', { 'is-danger': emailError })}
            value={email}
            onChange={handleEmailChange}
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
            className={cn('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={handleBodyChange}
          />
        </div>

        {bodyError && (
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
              'is-loading': isLoadingForAdd,
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
