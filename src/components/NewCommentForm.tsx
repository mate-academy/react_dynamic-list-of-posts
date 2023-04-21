import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { FormFilds } from '../types/FormFilds';

type Props = {
  postId: number,
  addComment: (newComment: Omit<Comment, 'id'>) => void,
  isCommentsAdding: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  addComment,
  isCommentsAdding,
}) => {
  // const [name, setName] = useState('');
  // const [isNameError, setIsNameError] = useState(false);
  // const [email, setEmail] = useState('');
  // const [isEmailError, setIsEmailError] = useState(false);
  // const [comment, setComment] = useState('');
  // const [isCommentError, setIsCommentError] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    comment: '',
  });
  const [errors, setErrors] = useState({
    isNameError: false,
    isEmailError: false,
    isCommentError: false,
  });
  const onAdd = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault();
    if (!(formValues.name.trim())) {
      setErrors(oldError => ({
        ...oldError,
        isNameError: true,
      }));

      return;
    }

    if (!(formValues.email.trim())) {
      setErrors(oldError => ({
        ...oldError,
        isEmailError: true,
      }));

      return;
    }

    if (!(formValues.comment.trim())) {
      setErrors(oldError => ({
        ...oldError,
        IsCommentError: true,
      }));

      return;
    }

    const newComment = {
      postId,
      name: formValues.name,
      email: formValues.email,
      body: formValues.comment,
    };

    addComment(newComment);

    setFormValues(oldValues => ({
      ...oldValues,
      comment: '',
    }));
  };

  const onClear = () => {
    setFormValues({
      name: '',
      email: '',
      comment: '',
    });
    setErrors({
      isNameError: false,
      isEmailError: false,
      isCommentError: false,
    });
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    switch (event.target.name) {
      case FormFilds.Name:
        setFormValues(oldValues => ({
          ...oldValues,
          name: event.target.value,
        }));
        setErrors(oldError => ({
          ...oldError,
          isNameError: false,
        }));
        break;
      case FormFilds.Email:
        setFormValues(oldValues => ({
          ...oldValues,
          email: event.target.value,
        }));
        setErrors(oldError => ({
          ...oldError,
          IsEmailError: false,
        }));
        break;
      case FormFilds.Body:
        setFormValues(oldValues => ({
          ...oldValues,
          comment: event.target.value,
        }));
        setErrors(oldError => ({
          ...oldError,
          IsCommentError: false,
        }));
        break;
      default:
        break;
    }
  };

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
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input',
              { 'is-danger': errors.isNameError },
            )}
            value={formValues.name}
            onChange={onChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.isNameError && (
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
            className={classNames(
              'input',
              { 'is-danger': errors.isEmailError },
            )}
            value={formValues.email}
            onChange={onChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.isEmailError && (
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
              { 'is-danger': errors.isCommentError },
            )}
            value={formValues.comment}
            onChange={onChange}
          />
        </div>

        {errors.isCommentError && (
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
              { 'is-loading': isCommentsAdding },
            )}
            onClick={onAdd}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={onClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
