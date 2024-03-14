import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment, CommentData } from '../types/Comment';
import { addComment } from '../services/comments';

type Props = {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  postId: number;
};

const defaultValue: CommentData = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC<Props> = ({ setComments, postId }) => {
  const [{ name, email, body }, setFormFieldsVal] = useState(defaultValue);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (value: string, key: string) => {
    setFormFieldsVal(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setNameError(!name.trim());
    setEmailError(!email.trim());
    setBodyError(!body.trim());

    if (!name.trim() || !email.trim() || !body.trim()) {
      return;
    }

    setLoading(true);

    addComment({
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
      postId,
    })
      .then((comment: Comment) => {
        setComments(prev => [...prev, comment]);
        setFormFieldsVal(prev => ({ ...prev, body: '' }));
      })
      .finally(() => setLoading(false));
  };

  const handleClear = () => {
    setFormFieldsVal(defaultValue);
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
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
            value={name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': nameError && !name })}
            onChange={e => handleChange(e.target.value, e.target.name)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && !name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && !name && (
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
            className={classNames('input', {
              'is-danger': emailError && !email,
            })}
            onChange={e => handleChange(e.target.value, e.target.name)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && !email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && !email && (
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
            className={classNames('input', { 'is-danger': bodyError && !body })}
            onChange={e => handleChange(e.target.value, e.target.name)}
          />
        </div>

        {bodyError && !body && (
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
              'is-loading': loading,
            })}
            disabled={loading}
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
