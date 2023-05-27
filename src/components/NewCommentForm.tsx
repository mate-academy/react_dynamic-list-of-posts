import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  createNewComment: (value: CommentData) => void;
  buttonLoad: boolean;
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  createNewComment,
  buttonLoad,
}) => {
  const [data, setData] = useState({ body: '', name: '', email: '' });
  const [dataError, setDataError] = useState({
    body: false, name: false, email: false,
  });
  const [submit, setSubmit] = useState(false);

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
      setSubmit(true);

      return;
    }

    createNewComment(data);
    setData(prev => ({ ...prev, body: '' }));
    setDataError(prev => ({ ...prev, body: false }));
    setSubmit(true);
  };

  const clearData = () => {
    setData({ body: '', name: '', email: '' });
    setDataError({ body: false, name: false, email: false });
    setSubmit(false);
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
              'is-danger': dataError.name && !data.name && submit,
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

          {(dataError.name && !data.name && submit) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>
        {(dataError.name && !data.name && submit) && (
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
              'is-danger': dataError.email && !data.email && submit,
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

          {(dataError.email && !data.email && submit) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {(dataError.email && !data.email && submit) && (
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
              'is-danger': dataError.body && !data.body && submit,
            })}
            value={data.body}
            onChange={(e) => setData(prev => ({
              ...prev,
              body: e.target.value,
            }))}
          />
        </div>

        {(dataError.body && !data.body && submit) && (
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
              'is-loading': buttonLoad,
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
