/* eslint-disable @typescript-eslint/indent */
import React, { useContext, useState } from 'react';
import { getComments, postComment } from '../api/lists';
import { ContextList } from './ListProvider/ListProvider';
import classNames from 'classnames';

const initialFormState = { name: '', email: '', body: '' };

export const NewCommentForm: React.FC = () => {
  const { selectPost, setComments } = useContext(ContextList);
  const [comment, setComment] = useState(initialFormState);
  const [error, setError] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const onReset = () => {
    setError(false);
    setComment(initialFormState);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError(!error);
    setSpinner(true);
    e.preventDefault();

    if (!comment.name.trim() || !comment.email.trim() || !comment.body.trim()) {
      setSpinner(false);

      return;
    }

    const newComment = {
      ...comment,
      postId: selectPost?.id,
    };

    if (selectPost) {
      postComment(newComment)
        .then(() => getComments(selectPost.id))
        .then(setComments)
        .finally(() => {
          setSpinner(false);
          setComment({ ...comment, body: '' });
          setError(false);
        });
    }
  };

  const handlerInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setComment(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
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
              'is-danger': !comment.name && error,
            })}
            value={comment.name}
            onChange={handlerInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!comment.name && error && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {!comment.name && error && (
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
              'is-danger': !comment.email && error,
            })}
            value={comment.email}
            onChange={handlerInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!comment.email && error && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!comment.email && error && (
          <p
            className={classNames('help', {
              'is-danger': !comment.email && error,
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
              'is-danger': !comment.body && error,
            })}
            value={comment.body}
            onChange={handlerInput}
          />
        </div>

        {!comment.body && error && (
          <p
            className={classNames('help', {
              'is-danger': !comment.body && error,
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
            className={classNames('button is-link ', { 'is-loading': spinner })}
          >
            {' '}
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={onReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
