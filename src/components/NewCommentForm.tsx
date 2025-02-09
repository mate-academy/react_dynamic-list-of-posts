import classNames from 'classnames';
import React from 'react';
import { clearComment, CurLoading, validateForm } from '../utils/servises';
import { useAppContext } from './HooksContext';

export const NewCommentForm: React.FC = () => {
  const {
    loading,
    setName,
    setEmail,
    setText,
    name,
    email,
    text,
    setErrorMessage,
    setLoading,
    comments,
    activePost,
    setComments,
    errorName,
    setErrorName,
    errorEmail,
    setErrorEmail,
    errorText,
    setErrorText,
    setNewComment,
  } = useAppContext();

  return (
    <form data-cy="NewCommentForm">
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
            className={classNames('input', {
              'is-danger': errorName,
            })}
            value={name}
            onChange={ev => {
              setName(ev.target.value);
              setErrorName(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <span
              className={classNames('icon is-small is-right', {
                'has-text-danger': errorName,
              })}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorName && (
          <p
            className={classNames('help', {
              'is-danger': errorName,
            })}
            data-cy="ErrorMessage"
          >
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
            className={classNames('input', {
              'is-danger': errorEmail,
            })}
            value={email}
            onChange={ev => {
              setEmail(ev.target.value);
              setErrorEmail(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className={classNames('icon is-small is-right', {
                'has-text-danger': errorEmail,
              })}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
          <p
            className={classNames('help', {
              'is-danger': errorEmail,
            })}
            data-cy="ErrorMessage"
          >
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
            className={classNames('textarea', {
              'is-danger': errorText,
            })}
            value={text}
            onChange={ev => {
              setText(ev.target.value);
              setErrorText(false);
            }}
          />
        </div>

        {errorText && (
          <p
            className={classNames('help', {
              'is-danger': errorText,
            })}
            data-cy="ErrorMessage"
          >
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': loading === CurLoading.AddComs,
            })}
            onClick={ev => {
              ev.preventDefault();
              validateForm(
                name,
                email,
                text,
                setLoading,
                comments,
                activePost,
                setComments,
                setText,
                setErrorName,
                setErrorEmail,
                setErrorText,
                setNewComment,
                setErrorMessage,
              );
            }}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() =>
              clearComment(
                setName,
                setEmail,
                setText,
                setErrorMessage,
                setErrorName,
                setErrorEmail,
                setErrorText,
              )
            }
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
