import React, { useCallback, useState } from 'react';
import cn from 'classnames';
// import { AppContext } from '../AppContext';
import { Comment, CommentData, CommentField } from '../types/Comment';

interface Props {
  selectedPostId: number,
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
  selectedPostId,
}) => {
  // const { setComments } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(notErrors);
  const [fields, setFields] = useState(emptyFields);

  const onFieldFocus = useCallback((
    key: keyof CommentData,
  ) => {
    setErrors((prev) => ({ ...prev, [key]: false }));
  }, []);

  const onFieldChange = useCallback((
    key: keyof CommentData,
    value: string,
  ) => {
    setFields((prev) => ({ ...prev, [key]: value.trimStart() }));
  }, []);

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
            value={fields.name}
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': errors.name,
            })}
            onFocus={() => onFieldFocus(CommentField.Name)}
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
            onFocus={() => onFieldFocus(CommentField.Email)}
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
            className={cn('input', {
              'is-danger': errors.body,
            })}
            onFocus={() => onFieldFocus(CommentField.Body)}
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
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
