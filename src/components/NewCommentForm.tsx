import React, { useState } from 'react';
import { usePostContext } from '../utils/PostContext';
import * as commentServices from './api/comments';
import classNames from 'classnames';

export const NewCommentForm: React.FC = () => {
  const { selectedPost, setComments, setIsCommentsError } = usePostContext();
  const initFormValue = {
    name: '',
    nameHasError: false,
    email: '',
    emailHasError: false,
    body: '',
    bodyHasError: false,
  };

  const [formValue, setFormValue] = useState(initFormValue);
  const [isCommentsSubmitting, setIsCommentsSubmitting] = useState(false);
  const isNameEmpty = !formValue.name.trim();
  const isEmailEmpty = !formValue.email.trim();
  const isBodyEmpty = !formValue.body.trim();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    const keyHasError = `${name}HasError`;

    setFormValue(prevValue => ({
      ...prevValue,
      [name]: value,
      [keyHasError]: false,
    }));
  };

  const validateInput = () => {
    if (isNameEmpty) {
      setFormValue(prevValue => ({
        ...prevValue,
        nameHasError: true,
      }));
    }

    if (isEmailEmpty) {
      setFormValue(prevValue => ({
        ...prevValue,
        emailHasError: true,
      }));
    }

    if (isBodyEmpty) {
      setFormValue(prevValue => ({
        ...prevValue,
        bodyHasError: true,
      }));
    }
  };

  const handleAddComment = async () => {
    setIsCommentsError(false);
    const { email, name, body } = formValue;

    if (selectedPost) {
      const newCommentsData = {
        postId: selectedPost.userId,
        name,
        email,
        body,
      };

      try {
        setIsCommentsSubmitting(true);
        const newComment =
          await commentServices.createComments(newCommentsData);

        setComments(prevState => [...prevState, newComment]);
        setFormValue(prevValue => ({
          ...prevValue,
          body: '',
        }));
      } catch (error) {
        setIsCommentsError(true);
      } finally {
        setIsCommentsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setFormValue(initFormValue);
    setIsCommentsError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateInput();
    if (isNameEmpty || isEmailEmpty || isBodyEmpty) {
      return;
    }

    handleAddComment();
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
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
            className={classNames('input', {
              'is-danger': formValue.nameHasError,
            })}
            value={formValue.name}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formValue.nameHasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formValue.nameHasError && (
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
              'is-danger': formValue.emailHasError,
            })}
            value={formValue.email}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formValue.emailHasError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formValue.emailHasError && (
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
              'is-danger': formValue.bodyHasError,
            })}
            value={formValue.body}
            onChange={handleInputChange}
          />
        </div>

        {formValue.bodyHasError && (
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
              'is-loading': isCommentsSubmitting,
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
