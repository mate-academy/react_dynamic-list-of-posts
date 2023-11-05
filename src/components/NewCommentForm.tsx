import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { createComment } from '../services/PostComments';

interface Props {
  postComments: Comment[],
  setPostComments: (comment: Comment[]) => void,
  setErrorMessage: (str: string) => void,
  selectedPostId: number,
}

export const NewCommentForm: React.FC<Props> = ({
  postComments,
  setPostComments,
  setErrorMessage,
  selectedPostId,
}) => {
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [text, setText] = useState('');
  const [hasTextError, setHasTextError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setHasTextError(false);
  };

  function addComment({
    postId,
    name: commentName,
    email: commentEmail,
    body,
  }: Comment) {
    setErrorMessage('');
    setIsLoading(true);

    createComment({
      postId,
      name: commentName,
      email: commentEmail,
      body,
    })
      .then(newComment => {
        setPostComments([...postComments, newComment]);
      })
      .catch(() => {
        setErrorMessage('Something went wrong!');
        setText('');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasNameError(!name.trim());
    setHasEmailError(!email.trim());
    setHasTextError(!text.trim());

    if (!name.trim() || !email.trim() || !text.trim()) {
      return;
    }

    addComment({
      id: postComments.length,
      postId: selectedPostId,
      name,
      email,
      body: text,
    });
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setText('');
  };

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
            className={classNames('input', { 'is-danger': hasNameError })}
            value={name}
            onChange={handleNameChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        {hasNameError && (
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
            className={classNames('input', { 'is-danger': hasEmailError })}
            value={email}
            onChange={handleEmailChange}
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
            className={classNames('textarea', { 'is-danger': hasEmailError })}
            value={text}
            onChange={handleTextChange}
          />
        </div>

        {hasTextError && (
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
