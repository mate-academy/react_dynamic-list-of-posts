import React, { Dispatch, SetStateAction, useState } from 'react';
import { Post } from '../types/Post';
import { addComment } from '../api/comments';
import classNames from 'classnames';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
  setComments: Dispatch<SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({ post, setComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [textError, setTextError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setTextError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBody = text.trim();

    let hasValidationErrors = false;

    if (!trimmedName) {
      hasValidationErrors = true;
      setNameError('Name is required');
    }

    if (!trimmedEmail) {
      hasValidationErrors = true;
      setEmailError('Email is required');
    }

    if (!trimmedBody) {
      hasValidationErrors = true;
      setTextError('Enter some text');
    }

    if (hasValidationErrors) {
      return;
    }

    setLoading(true);
    addComment({ postId: post?.id, name, email, body: text })
      .then(receivedComment => {
        setComments(prev => [...prev, receivedComment as Comment]);
        setText('');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formReset = () => {
    setName('');
    setEmail('');
    setText('');
    setNameError('');
    setEmailError('');
    setTextError('');
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
            className={classNames('input', { 'is-danger': nameError })}
            onChange={handleNameChange}
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
            {nameError}
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
            {emailError}
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
            value={text}
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': textError })}
            onChange={handleTextChange}
          />
        </div>

        {textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {textError}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': loading,
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
            onClick={formReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
