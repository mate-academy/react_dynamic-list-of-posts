import React, { useState, memo, useCallback } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  comments: Comment[];
  onAdd: (newComment: Comment) => void;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = memo(({
  comments,
  onAdd,
  postId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError(false);
  }, [name, nameError]);

  const onChangeEmail = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
    setEmailError(false);
  }, [email, emailError]);

  const onChangeMessage = useCallback((
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMessage(e.target.value);
    setMessageError(false);
  }, [message, messageError]);

  const handleSubmit = useCallback(async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setNameError(!name);
    setEmailError(!email);
    setMessageError(!message);

    if (name && email && message) {
      const newComment: Comment = {
        id: Math.max(...comments.map(comment => comment.id)) + 1,
        postId,
        name,
        email,
        body: message,
      };

      setIsLoading(true);
      const postedComment: Comment = await client.post('/comments', newComment);

      setIsLoading(false);

      if (postedComment) {
        onAdd(postedComment);
        setMessage('');
      }
    }
  }, [name, nameError, email, emailError, message, messageError, isLoading]);

  const handleClear = useCallback(() => {
    setName('');
    setEmail('');
    setMessage('');
  }, [name, email, message]);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={e => onChangeName(e)}
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
            className={classNames('input', { 'is-danger': emailError })}
            value={email}
            onChange={e => onChangeEmail(e)}
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
            className={classNames('textarea', { 'is-danger': messageError })}
            value={message}
            onChange={e => onChangeMessage(e)}
          />
        </div>

        {messageError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link',
              { 'is-loading': isLoading },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
