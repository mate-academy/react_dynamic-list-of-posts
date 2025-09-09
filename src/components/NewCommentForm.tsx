import React, { useState } from 'react';
import cn from 'classnames';
import { client } from '../utils/fetchClient';
import { PostComment } from '../types/PostComment';

type Props = {
  currentPostId: number | null;
  createdCommentId: number;
  comments: PostComment[];
  addCommentHandler: (comments: PostComment[]) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  currentPostId,
  createdCommentId,
  comments,
  addCommentHandler,
}) => {
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isCommentTextError, setIsCommentTextError] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={async event => {
        event.preventDefault();

        const nameError = name.trim() === '';
        const emailError = email.trim() === '';
        const textError = text.trim() === '';

        setIsNameError(nameError);
        setIsNameError(emailError);
        setIsNameError(textError);

        if (email.trim() === '') {
          setIsEmailError(true);
        }

        if (text.trim() === '') {
          setIsCommentTextError(true);
        }

        if (
          isNameError ||
          isEmailError ||
          isCommentTextError ||
          !currentPostId
        ) {
          return;
        }

        try {
          setIsLoading(true);

          const newComment = {
            id: createdCommentId,
            postId: currentPostId,
            name: name,
            email: email,
            body: text,
          };

          await client.post('/comments', newComment);

          addCommentHandler([...comments, newComment]);

          setEmail('');
          setName('');
          setText('');
        } finally {
          setIsLoading(false);
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
            value={name}
            onChange={event => {
              setName(event.target.value);
              setIsNameError(false);
            }}
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': isNameError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setIsEmailError(false);
            }}
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': isEmailError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
            value={text}
            onChange={event => {
              setText(event.target.value);
              setIsCommentTextError(false);
            }}
            name="body"
            placeholder="Type comment here"
            className={cn('input', { 'is-danger': isCommentTextError })}
          />
        </div>

        {isCommentTextError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
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
            onClick={event => {
              event.preventDefault();
              setName('');
              setEmail('');
              setText('');
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
