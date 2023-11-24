import React, { useContext, useState } from 'react';
import cn from 'classnames';
// import { PostContext } from './PostContext';
import { CommentContext } from './CommentContext';
import { Post } from '../types/Post';

type FormData = {
  name: string;
  email: string;
  body: string;
};

type Props = {
  selectedPost: Post;
};

export const NewCommentForm: React.FC<Props> = ({ selectedPost }) => {
  const {
    submitNewComment,
    isSubmittingComment,
  } = useContext(CommentContext);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    body: '',
  });
  const [hasError, setHasError] = useState({
    name: false,
    email: false,
    body: false,
  });

  const { name, email, body } = formData;

  const handleFormDataChange = (e: any) => {
    const { name: inputName, value } = e.target;

    setHasError(prevState => ({ ...prevState, [inputName]: false }));

    setFormData(prevData => (
      {
        ...prevData,
        [name]: value,
      }
    ));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameInput = name.trim();
    const bodyInput = body.trim();
    const emailInput = email.trim();

    if (!nameInput) {
      setHasError(prevState => ({ ...prevState, name: true }));
    }

    if (!bodyInput) {
      setHasError(prevState => ({ ...prevState, body: true }));
    }

    if (!emailInput) {
      setHasError(prevState => ({ ...prevState, email: true }));
    }

    if (!name || !email || !body) {
      return;
    }

    submitNewComment({
      postId: selectedPost.id,
      name: nameInput,
      email: emailInput,
      body:
      bodyInput,
    });

    setFormData(prevData => ({ ...prevData, body: '' }));
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
            className={cn('input', { 'is-danger': hasError.name })}
            value={name}
            onChange={handleFormDataChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasError.name && (
            <span
              className={cn(
                'icon is-small is-right',
                { 'has-text-danger': hasError.name },
              )}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasError.name
        && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
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
            className={cn('input', { 'is-danger': hasError.email })}
            value={email}
            onChange={handleFormDataChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasError.email && (
            <span
              className={cn(
                'icon is-small is-right',
                { 'has-text-danger': hasError.email },
              )}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasError.email
        && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
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
            className={cn('textarea', { 'is-danger': hasError.body })}
            value={body}
            onChange={handleFormDataChange}
          />
        </div>

        {hasError.body
          && (
            <p
              className="help is-danger"
              data-cy="ErrorMessage"
            >
              Enter some text
            </p>
          )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn(
              'button is-link',
              { 'is-loading': isSubmittingComment },
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
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
// 1. The form requires an author's name and email and a comment text.
//     - show errors only after the form is submitted;
//     - remove an error on the field change;
//     - keep the `name` and `email` after the successful submit but clear a comment text;
//     - The `Clear` button should also clear all errors;
//     - Add the `is-loading` class to the submit button while waiting for a response;
//     - Add the new comment received as a response from the `API` to the end of the list;
// 1. Implement comment deletion
//     - Delete the commnet immediately not waiting for the server response to improve the UX.
// 1. (*) Handle `Add` and `Delete` errors so the user can retry
