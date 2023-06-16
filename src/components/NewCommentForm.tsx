import React, {
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import classNames from 'classnames';

import { Comment, CommentData } from '../types/Comment';
import { createComment } from '../api/comments';
import { ErrorType } from '../types/ErrorType';

import { useFormFields } from '../customHooks/useFormFields';
import { useFormValidate } from '../customHooks/useFormValidate';

type Props = {
  postId: number;
  onSetErrorType: (errorType: ErrorType) => void;
  onSetFromIsOpen: (value: boolean) => void;
  onSetIsError: (value: boolean) => void;
  onSetComments: Dispatch<SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onSetErrorType,
  onSetFromIsOpen,
  onSetIsError,
  onSetComments,
}) => {
  const [formFieldsState, {
    setName,
    setEmail,
    setComment,
    clearForm,
  }] = useFormFields();

  const [isLoading, setIsLoading] = useState(false);

  const [formErrorState, {
    setNameIsValid,
    setEmailIsValid,
    setCommentIsValid,
  }] = useFormValidate();

  const handleCreateComment = async (data: CommentData) => {
    const newComment = {
      postId,
      ...data,
    };

    try {
      setIsLoading(true);

      const comment = await createComment(newComment);

      setComment('');
      onSetComments((prevComments) => ([
        ...prevComments,
        comment,
      ]));
    } catch {
      onSetFromIsOpen(false);
      onSetIsError(true);
      onSetErrorType(ErrorType.onCommentsLoad);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = (data: CommentData) => {
    const trimmedValues = {
      name: data.name.trim(),
      email: data.email.trim(),
      comment: data.body.trim(),
    };

    const { name, email, comment } = trimmedValues;

    if (name && email && comment) {
      return true;
    }

    if (!name) {
      setNameIsValid(false);
    }

    if (!email) {
      setEmailIsValid(false);
    }

    if (!comment) {
      setCommentIsValid(false);
    }

    return false;
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const commentData = Object.fromEntries(formData.entries());

    const formIsValid = validateForm(commentData as CommentData);

    if (formIsValid) {
      handleCreateComment(commentData as CommentData);
    }
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setNameIsValid(true);

    setName(value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setEmailIsValid(true);

    setEmail(value);
  };

  const handleChangeComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;

    setCommentIsValid(true);

    setComment(value);
  };

  const handleResetForm = () => {
    clearForm();
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
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
            className={classNames(
              'input',
              { 'is-danger': !formErrorState.nameIsValid },
            )}
            value={formFieldsState.name}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!formErrorState.nameIsValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!formErrorState.nameIsValid && (
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
            className={classNames(
              'input',
              { 'is-danger': !formErrorState.emailIsValid },
            )}
            value={formFieldsState.email}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!formErrorState.emailIsValid && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!formErrorState.emailIsValid && (
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
            className={classNames(
              'textarea',
              { 'is-danger': !formErrorState.commentIsValid },
            )}
            value={formFieldsState.comment}
            onChange={handleChangeComment}
          />
        </div>

        {!formErrorState.commentIsValid && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isLoading },
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
            onClick={handleResetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
