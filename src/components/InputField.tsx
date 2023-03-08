import React from 'react';
import classNames from 'classnames';

import { FieldType } from '../types/FieldType';
import { CommentData } from '../types/Comment';

type Props = {
  inputType: FieldType,
  newComment: CommentData,
  onChange: React.Dispatch<React.SetStateAction<CommentData>>,
  emptyValueError: boolean,
  setEmptyValueError: React.Dispatch<React.SetStateAction<boolean>>,
};

export const InputField: React.FC<Props> = ({
  inputType,
  newComment,
  onChange,
  emptyValueError,
  setEmptyValueError,
}) => {
  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (emptyValueError) {
      setEmptyValueError(false);
    }

    onChange({
      ...newComment,
      [inputType]: event.target.value,
    });
  };

  switch (inputType) {
    case FieldType.Name:
      return (
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
              className={classNames(
                'input',
                { 'is-danger': emptyValueError },
              )}
              value={newComment[inputType]}
              onChange={inputHandler}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {emptyValueError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {emptyValueError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {`${inputType} is required`}
            </p>
          )}
        </div>
      );

    case FieldType.Email:
      return (
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
              className={classNames(
                'input',
                { 'is-danger': emptyValueError },
              )}
              value={newComment[inputType]}
              onChange={inputHandler}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>

            {emptyValueError && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>

          {emptyValueError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Email is required
            </p>
          )}
        </div>
      );

    default:
      return (
        <div className="field" data-cy="BodyField">
          <label className="label" htmlFor="comment-body">
            Comment Text
          </label>

          <div className="control">
            <textarea
              id="comment-body"
              name="body"
              placeholder="Type comment here"
              className={classNames(
                'textarea',
                { 'is-danger': emptyValueError },
              )}
              value={newComment[inputType]}
              onChange={inputHandler}
            />
          </div>

          {emptyValueError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Enter some text
            </p>
          )}
        </div>
      );
  }
};
