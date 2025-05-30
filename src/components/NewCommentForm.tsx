import React, { useState, FormEvent, Dispatch } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';

export interface NewCommentFormProps {
  isNewCommentLoading: boolean;
  newCommentValues: Comment;
  setNewCommentValues: Dispatch<React.SetStateAction<Comment>>;
  onAddNewComment: () => void;
  onClearComment: () => void;
}

type ErrorFields = Partial<{ [K in keyof Comment]: boolean }>;

const noErrorState = {
  name: false,
  email: false,
  body: false,
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  isNewCommentLoading,
  newCommentValues,
  setNewCommentValues,
  onAddNewComment,
  onClearComment,
}) => {
  const [errorFields, setErrorFields] = useState<ErrorFields>(noErrorState);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let hasErrors = false;

    (Object.keys(newCommentValues) as Array<keyof Comment>).forEach(key => {
      if (errorFields[key] !== undefined) {
        setErrorFields(current => ({
          ...current,
          [key]: !newCommentValues[key],
        }));

        if (!newCommentValues[key]) {
          hasErrors = true;
        }
      }
    });
    if (!hasErrors) {
      onAddNewComment();
    }
  };

  const resetHandler = () => {
    setErrorFields(noErrorState);
    onClearComment();
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
            className={classNames('input', { 'is-danger': errorFields.name })}
            value={newCommentValues.name}
            onChange={event =>
              setNewCommentValues({
                ...newCommentValues,
                name: event.target.value,
              })
            }
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {errorFields.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errorFields.name && (
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
            className={classNames('input', { 'is-danger': errorFields.email })}
            value={newCommentValues.email}
            onChange={event =>
              setNewCommentValues({
                ...newCommentValues,
                email: event.target.value,
              })
            }
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {errorFields.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errorFields.email && (
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
              'is-danger': errorFields.body,
            })}
            value={newCommentValues.body}
            onChange={event =>
              setNewCommentValues({
                ...newCommentValues,
                body: event.target.value,
              })
            }
          />
        </div>
        {errorFields.body && (
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
              'is-loading': isNewCommentLoading,
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
            onClick={resetHandler}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
