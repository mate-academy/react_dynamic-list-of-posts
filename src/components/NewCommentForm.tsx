import React, { useState } from 'react';
import classNames from 'classnames';
import { ErrorNotification } from '../types/ErrorNotification';
import { Comment, CommentData } from '../types/Comment';
import { apiActions } from '../utils/apiAction';

type Props = {
  postId: number,
  errors: ErrorNotification,
  onError: (error: (prevError: ErrorNotification)
  => ErrorNotification) => void,
  onSetComments: React.Dispatch<React.SetStateAction<Comment[]>>,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  errors,
  onError,
  onSetComments,
}) => {
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [hasEmptyField, setHasEmptyField] = useState(false);
  const [formData, setFormData] = useState<CommentData>({
    email: '',
    name: '',
    body: '',
  });

  const handleReset = () => {
    setFormData({
      email: '',
      name: '',
      body: '',
    });
  };

  const handleUpdateInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).some(f => !f.trim())) {
      setHasEmptyField(true);

      return;
    }

    setIsFormSubmit(true);
    setHasEmptyField(false);

    const data = {
      ...formData,
      postId,
    };

    apiActions.addComment(data)
      .then((res) => onSetComments(current => ([
        ...current,
        res,
      ])))
      .catch(() => onError(error => ({
        ...error,
        newComment: true,
      })))
      .finally(() => setIsFormSubmit(false));

    setFormData((current => ({
      ...current,
      body: '',
    })));
  };

  const { name, body, email } = formData;

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        {errors.newComment && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

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
            className={classNames('input', {
              'is-danger': !name && hasEmptyField,
            })}
            onChange={handleUpdateInfo}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!name && hasEmptyField && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!name && hasEmptyField && (
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
            type="email"
            name="email"
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': !email && hasEmptyField,
            })}
            onChange={handleUpdateInfo}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!email && hasEmptyField && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!email && hasEmptyField && (
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
            className={classNames('textarea', {
              'is-danger': !body && hasEmptyField,
            })}
            onChange={handleUpdateInfo}
          />
        </div>

        {!body && hasEmptyField && (
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
              'is-loading': isFormSubmit,
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
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
