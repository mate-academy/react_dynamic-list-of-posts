/* eslint-disable react/button-has-type */
import cn from 'classnames';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { postComment } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  setComments: Dispatch<SetStateAction<Comment[]>>
};

export const NewCommentForm: React.FC<Props> = ({ setComments }) => {
  const defaultComment = {
    name: '',
    email: '',
    body: '',
  };
  const defaultFormError = {
    name: false,
    email: false,
    body: false,
    submitting: false,
  };

  const [commentData, setCommentData] = useState<CommentData>(defaultComment);
  const [isSubmiting, setSubmiting] = useState(false);
  const [formErrors, setFormError] = useState(defaultFormError);
  const { name, email, body } = commentData;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement
    | HTMLTextAreaElement>,
  ) => {
    setCommentData(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    setFormError(prev => ({
      ...prev,
      [event.target.name]: false,
    }));
  };

  const addComment = async () => {
    setSubmiting(true);
    try {
      const newComment = await postComment(commentData);

      setComments(prev => [...prev, newComment]);
    } catch {
      setFormError(prev => ({
        ...prev,
        submitting: true,
      }));
    } finally {
      setSubmiting(false);
    }
  };

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    let hasError = false;

    event.preventDefault();
    if (!name) {
      setFormError(prev => ({ ...prev, name: true }));
      hasError = true;
    }

    if (!email) {
      setFormError(prev => ({ ...prev, email: true }));
      hasError = true;
    }

    if (!body) {
      setFormError(prev => ({ ...prev, body: true }));
      hasError = true;
    }

    if (hasError) {
      setSubmiting(false);

      return;
    }

    addComment();
    setCommentData(prev => ({ ...prev, body: '' }));
  };

  const handleClear = () => {
    setCommentData(defaultComment);
    setFormError(defaultFormError);
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
            className={cn('input', {
              'is-danger': formErrors.name,
            })}
            value={name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.name && (
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
            className={cn('input', {
              'is-danger': formErrors.email,
            })}
            value={email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.email && (
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
            className={cn('textarea', {
              'is-danger': formErrors.body,
            })}
            value={body}
            onChange={handleChange}
          />
        </div>

        {formErrors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link',
              { 'is-loading': isSubmiting })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
      {formErrors.submitting && (
        <div
          className="notification is-danger"
          data-cy="CommentsError"
        >
          Something went wrong
        </div>
      )}

    </form>

  );
};
