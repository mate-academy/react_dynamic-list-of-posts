import React, { useContext, useState } from 'react';
import cn from 'classnames';

import { DispatchContext, StateContext } from '../context/ContextReducer';

export const NewCommentForm: React.FC = () => {
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorBody, setErrorBody] = useState(false);

  const { newComment, fetchOfAddComent } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleErrorNameBlur = () => {
    if (!newComment.name.length) {
      setErrorName(true);
    }
  };

  const handleErrorEmailBLur = () => {
    if (!newComment.email.length) {
      setErrorEmail(true);
    }
  };

  const handleErrorBodyBLur = () => {
    if (!newComment.body.length) {
      setErrorBody(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorName(false);

    dispatch({ type: 'setName', name: event.target.value });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorEmail(false);

    dispatch({ type: 'setEmail', email: event.target.value });
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrorBody(false);

    dispatch({ type: 'setBody', body: event.target.value });
  };

  const reset = () => {
    setErrorName(false);
    setErrorEmail(false);
    setErrorBody(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !newComment.name.length ||
      !newComment.email.length ||
      !newComment.body.length
    ) {
      setErrorName(true);
      setErrorEmail(true);
      setErrorBody(true);

      return;
    }

    dispatch({ type: 'addComment' });

    reset();
  };

  const handleClear = () => {
    dispatch({ type: 'setName', name: '' });
    dispatch({ type: 'setEmail', email: '' });
    dispatch({ type: 'setBody', body: '' });
    reset();
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            onChange={handleNameChange}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': errorName })}
            value={newComment.name}
            onBlur={handleErrorNameBlur}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorName && (
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
            onChange={handleEmailChange}
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': errorEmail })}
            value={newComment.email}
            onBlur={handleErrorEmailBLur}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
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
            onChange={handleBodyChange}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': errorBody })}
            value={newComment.body}
            onBlur={handleErrorBodyBLur}
          />
        </div>

        {errorBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': fetchOfAddComent })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            onClick={handleClear}
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
