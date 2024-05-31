import React, { Dispatch, SetStateAction, useState } from 'react';
import { Comment } from '../types/Comment';
import cn from 'classnames';
import { onCommentCreate } from '../api/posts';

type Props = {
  addComment: (comment: Comment) => void;
  isLoading: boolean;
  postId: number;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: (errorMessage: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  isLoading,
  postId,
  setIsLoading,
  setErrorMessage,
}) => {
  const [NameErrorMessage, setNameErrorMessage] = useState('');
  const [EmailErrorMessage, setEmailErrorMessage] = useState('');
  const [BodyErrorMessage, setBodyErrorMessage] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setNameErrorMessage('');
    setEmailErrorMessage('');
    setBodyErrorMessage('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newName = name.trim();
    const newEmail = email.trim();
    const newBody = body.trim();

    let isError = false;

    if (!newName) {
      setNameErrorMessage('Name is required');

      isError = true;
    }

    if (!newEmail) {
      setEmailErrorMessage('Email is required');

      isError = true;
    }

    if (!newBody) {
      setBodyErrorMessage('Enter some text');

      isError = true;
    }

    if (isError) {
      return;
    }

    const newComment = {
      postId,
      name: newName,
      email: newEmail,
      body: newBody,
    };

    setIsLoading(true);

    onCommentCreate(newComment)
      .then(commentFromServer => {
        addComment(commentFromServer);
        setBody('');
      })
      .catch(() => setErrorMessage('Unable add comment'))
      .finally(() => setIsLoading(false));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
            value={name}
            onChange={event => {
              setName(event.target.value);
              setNameErrorMessage('');
            }}
            className={cn('input', { 'is-danger': NameErrorMessage })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
        </div>

        {NameErrorMessage && (
          <>
            <p className="help is-danger" data-cy="ErrorMessage">
              {NameErrorMessage}
            </p>

            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          </>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setEmailErrorMessage('');
            }}
            className={cn('input', { 'is-danger': EmailErrorMessage })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        </div>

        {EmailErrorMessage && (
          <>
            <p className="help is-danger" data-cy="ErrorMessage">
              {EmailErrorMessage}
            </p>

            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          </>
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
            className={cn('input', { 'is-danger': BodyErrorMessage })}
            value={body}
            onChange={event => {
              setBody(event.target.value);
              setBodyErrorMessage('');
            }}
          />
        </div>

        {BodyErrorMessage && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {BodyErrorMessage}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
