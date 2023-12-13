import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { Comment, CommentData, CommentField } from '../types/Comment';
import * as service from '../api/api';

interface Props {
  postId: number,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
}

const notErrors = {
  name: false,
  email: false,
  body: false,
};

const emptyFields = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC<Props> = ({
  setIsError,
  setComments,
  postId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(notErrors);
  const [fields, setFields] = useState(emptyFields);

  const onFieldChange = useCallback((
    key: keyof CommentData,
    value: string,
  ) => {
    setFields((prev) => ({ ...prev, [key]: value.trimStart() }));
    setErrors((prev) => ({ ...prev, [key]: false }));
  }, []);

  const onFieldClear = useCallback(() => {
    setFields(emptyFields);
    setErrors(notErrors);
  }, []);

  const addComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(notErrors);

    if (!fields.name || !fields.email || !fields.body) {
      setErrors({
        name: !fields.name,
        email: !fields.email,
        body: !fields.body,
      });

      return;
    }

    setIsLoading(true);

    service.createComment({ ...fields, postId })
      .then((comment) => {
        setComments((prev) => [...prev, comment]);
        setFields({ ...fields, body: '' });
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={addComment}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={fields.name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': errors.name,
            })}
            onChange={e => onFieldChange(CommentField.Name, e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
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
            value={fields.email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': errors.email,
            })}
            onChange={e => onFieldChange(CommentField.Email, e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
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
            value={fields.body}
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': errors.body,
            })}
            onChange={e => onFieldChange(CommentField.Body, e.target.value)}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isLoading,
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
            onClick={onFieldClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
