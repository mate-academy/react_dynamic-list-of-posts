import React, { FormEvent, useEffect, useState } from 'react';
import { CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  handleOnAdd: (newComment: CommentData) => void;
  isNewCommentLoading: boolean;
  postSelected: Post | null;
};

export const NewCommentForm: React.FC<Props> = ({
  handleOnAdd,
  isNewCommentLoading,
  postSelected,
}) => {
  const [formData, setFormData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });

  const [formErrors, setFormErrors] = useState<{
    name: boolean;
    email: boolean;
    body: boolean;
  }>({
    name: false,
    email: false,
    body: false,
  });

  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      body: '',
    });
    setFormErrors({
      name: false,
      email: false,
      body: false,
    });
  }, [postSelected]);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const isNameEmpty = formData.name.trim().length === 0;
    const isEmailEmpty = formData.email.trim().length === 0;
    const isBodyEmpty = formData.body.trim().length === 0;

    setFormErrors({
      name: isNameEmpty,
      email: isEmailEmpty,
      body: isBodyEmpty,
    });

    if (isNameEmpty || isEmailEmpty || isBodyEmpty) {
      return;
    }

    handleOnAdd(formData);
    setFormData({ ...formData, body: '' });
  };

  const handleFormReset = () => {
    setFormData({ ...formData, body: '' });
    setFormErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
            className={`input ${formErrors.name ? 'is-danger' : ''}`}
            value={formData.name}
            onChange={({ target }) => setFormData((prev) => (
              { ...prev, name: target.value.trimStart() }))}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >

              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.name && (
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
            className={`input ${formErrors.email ? 'is-danger' : ''}`}
            value={formData.email}
            onChange={({ target }) => setFormData((prev) => (
              { ...prev, email: target.value.trimStart() }))}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >

              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.email && (
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
            className={`textarea ${formErrors.body ? 'is-danger' : ''}`}
            value={formData.body}
            onChange={({ target }) => setFormData((prev) => (
              { ...prev, body: target.value.trimStart() }))}
          />
        </div>

        {formErrors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${
              isNewCommentLoading ? 'is-loading' : ''
            }`}
            data-cy="AddCommentButton"
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleFormReset}
            data-cy="ClearButton"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
