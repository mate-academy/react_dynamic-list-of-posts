import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  createNewComment: (value: CommentData) => void;
  isButtonLoad: boolean;
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  createNewComment,
  isButtonLoad,
}) => {
  const [data, setData] = useState({ body: '', name: '', email: '' });
  const [dataError, setDataError] = useState({
    body: false,
    name: false,
    email: false,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const isValidName = dataError.name && !data.name && isSubmit;
  const isValidEmail = dataError.email && !data.email && isSubmit;
  const isValidBody = dataError.body && !data.body && isSubmit;

  const isValidData = data.body.trim()
    && data.email.trim()
    && data.name.trim();

  const addComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidData) {
      setDataError({
        body: data.body.trim().length === 0,
        name: data.name.trim().length === 0,
        email: data.email.trim().length === 0,
      });
      setIsSubmit(true);

      return;
    }

    createNewComment(data);
    setData(prev => ({ ...prev, body: '' }));
    setDataError(prev => ({ ...prev, body: false }));
    setIsSubmit(true);
  };

  const clearData = () => {
    setData({ body: '', name: '', email: '' });
    setDataError({ body: false, name: false, email: false });
    setIsSubmit(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={addComment}>
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
              'is-danger': isValidName,
            })}
            value={data.name}
            onChange={(e) => setData(prev => ({
              ...prev,
              name: e.target.value,
            }))}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {(isValidName) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>
        {(isValidName) && (
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
            className={classNames('input', {
              'is-danger': isValidEmail,
            })}
            value={data.email}
            onChange={(e) => setData(prev => ({
              ...prev,
              email: e.target.value,
            }))}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {(isValidEmail) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {(isValidEmail) && (
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
            className={classNames('textarea', {
              'is-danger': isValidBody,
            })}
            value={data.body}
            onChange={(e) => setData(prev => ({
              ...prev,
              body: e.target.value,
            }))}
          />
        </div>

        {(isValidBody) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isButtonLoad,
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
            onClick={clearData}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
