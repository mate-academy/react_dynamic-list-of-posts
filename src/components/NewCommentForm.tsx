/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../AppContext';

export const NewCommentForm: React.FC = () => {
  const {
    handleAddComment,
    postActiveId,
    setIsCommentSuccess,
    isCommentSuccess,
  } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [bodyError, setBodyError] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  function onAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim() === '') {
      setNameError(true);
    }

    if (email.trim() === '') {
      setEmailError(true);
    }

    if (body.trim() === '') {
      setBodyError(true);
    }

    if (nameError || emailError || bodyError) {
      return;
    }

    if (name && email && body) {
      setIsCommentSuccess(false);
      setLoadingButton(true);
      handleAddComment({
        name, email, postId: postActiveId, body,
      });
    }
  }

  function handleClear() {
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
    setName('');
    setEmail('');
    setBody('');
  }

  useEffect(() => {
    if (body && isCommentSuccess) {
      setLoadingButton(false);
      setBody('');
    }
  }, [isCommentSuccess]);

  useEffect(() => {
    setNameError(false);
  }, [name]);

  useEffect(() => {
    setEmailError(false);
  }, [email]);

  useEffect(() => {
    setBodyError(false);
  }, [body]);

  return (
    <form data-cy="NewCommentForm" onSubmit={onAdd}>
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
            onChange={(event) => setName(event.target.value)}
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
            onChange={(event) => setEmail(event.target.value)}
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
            className={classNames('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={(event) => setBody(event.target.value)}
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
            className={classNames('button', 'is-link',
              { 'is-loading': loadingButton })}
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
