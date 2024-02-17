import React, { useState } from 'react';
import cn from 'classnames';
import { Comment, CommentData } from '../types/Comment';
import * as request from '../api/requests';

type Props = {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  postId: number;
};

const INITIAL_VALUE: CommentData = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC<Props> = ({ setComments, postId }) => {
  const [{ name, email, body }, setFormFieldsVal] = useState(INITIAL_VALUE);
  const [isLoading, setIsLoading] = useState(false);

  const [nameHasError, setNameHasError] = useState(false);
  const [bodyHasError, setBodyHasError] = useState(false);
  const [emailHasError, setEmailHasError] = useState(false);

  const handleChange = (value: string, key: string) => {
    setFormFieldsVal(prevState => ({
      ...prevState,
      [key]: value.trim(),
    }));
  };

  const handleReset = () => {
    setFormFieldsVal(INITIAL_VALUE);
    setNameHasError(false);
    setBodyHasError(false);
    setEmailHasError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setNameHasError(!name);
    setBodyHasError(!body);
    setEmailHasError(!email);

    if (!name || !body || !email) {
      return;
    }

    setIsLoading(true);

    request.addComment({
      name, body, email, postId,
    })
      .then((comment: Comment) => {
        setComments(prev => [...prev, comment]);
        setFormFieldsVal(prev => ({ ...prev, body: '' }));
      })
      .catch()
      .finally(() => setIsLoading(false));
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
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': nameHasError })}
            onChange={e => handleChange(e.target.value, e.target.name)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameHasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameHasError && (
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
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': emailHasError })}
            onChange={e => handleChange(e.target.value, e.target.name)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailHasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailHasError && (
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
            value={body}
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': bodyHasError })}
            onChange={e => handleChange(e.target.value, e.target.name)}
          />
        </div>

        {bodyHasError && (
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
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
