import React, { useState } from 'react';
import cn from 'classnames';

import { Comment } from '../../types/Comment';

type Props = {
  postId: number;
  onAddComment: (comment: Omit<Comment, 'id'>) => Promise<void>;
};

const REMOVE_SPACES_PATTERN = /^\s+|\s+$|\s+(?=\s)/g;

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [nameField, setNameField] = useState<string>('');
  const [isNameError, setIsNameError] = useState<boolean>(false);

  const [emailField, setEmailField] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<boolean>(false);

  const [textField, setTextField] = useState<string>('');
  const [isTextError, setIsTextError] = useState<boolean>(false);

  const [isAddingPost, setIsAddingPost] = useState<boolean>(false);

  let areEmptyFields = false;

  const handlerClearFormFields = () => {
    setNameField('');
    setIsNameError(false);
    setEmailField('');
    setIsEmailError(false);
    setTextField('');
    setIsTextError(false);
  };

  const handlerChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNameError) {
      setIsNameError(false);
    }

    setNameField(e.target.value.replace(REMOVE_SPACES_PATTERN, ' '));
  };

  const handlerChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEmailError) {
      setIsEmailError(false);
    }

    setEmailField(e.target.value);
  };

  const handlerChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isTextError) {
      setIsTextError(false);
    }

    setTextField(e.target.value.replace(REMOVE_SPACES_PATTERN, ' '));
  };

  const handlerSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!nameField) {
      setIsNameError(true);
      areEmptyFields = true;
    }

    if (!emailField) {
      setIsEmailError(true);
      areEmptyFields = true;
    }

    if (!textField) {
      setIsTextError(true);
      areEmptyFields = true;
    }

    if (areEmptyFields) {
      return;
    }

    const newComment: Omit<Comment, 'id'> = {
      postId,
      name: nameField,
      email: emailField,
      body: textField,
    };

    setIsAddingPost(true);

    onAddComment(newComment)
      .finally(() => {
        setTextField('');
        setIsAddingPost(false);
      });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handlerSubmitForm}>
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
            className={cn('input', { 'is-danger': isNameError })}
            value={nameField}
            onChange={handlerChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': isEmailError })}
            value={emailField}
            onChange={handlerChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>
        {isEmailError && (
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
            className={cn('input', { 'is-danger': isTextError })}
            value={textField}
            onChange={handlerChangeTextArea}
          />
        </div>

        {isTextError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn(
              'button',
              'is-link',
              { 'is-loading': isAddingPost },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handlerClearFormFields}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
