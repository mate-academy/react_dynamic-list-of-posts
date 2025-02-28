import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

export interface IsFormData {
  name: boolean;
  email: boolean;
  body: boolean;
}

interface CommentFormProps {
  addComment: (commentData: CommentData) => Promise<void>;
}

export const NewCommentForm: React.FC<CommentFormProps> = ({ addComment }) => {
  const [loadingData, setLoadingData] = useState(false);
  const [formData, setFormData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [isFormData, setIsFormData] = useState<IsFormData>({
    name: false,
    email: false,
    body: false,
  });

  const handleFormField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData(current => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setIsFormData(current => ({
      ...current,
      [event.target.name]: false,
    }));
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      body: '',
    });
    setIsFormData({
      name: false,
      email: false,
      body: false,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidForm = Object.values(formData).every(value => value.trim());

    if (!isValidForm) {
      setIsFormData({
        name: !formData.name.trim(),
        email: !formData.email.trim(),
        body: !formData.body.trim(),
      });

      return;
    }

    setLoadingData(true);

    try {
      await addComment(formData);
    } catch (error) {
      // console.error('Failed to submit comment:', error);
    } finally {
      setLoadingData(false);
      setFormData(current => ({ ...current, body: '' }));
    }
  };

  return (
    <form data-cy="NewCommentForm" onReset={clearForm} onSubmit={handleSubmit}>
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
              'is-danger': isFormData.name,
            })}
            // className="input is-danger"
            onChange={handleFormField}
            value={formData.name}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isFormData.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isFormData.name && (
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
              'is-danger': isFormData.email,
            })}
            onChange={handleFormField}
            value={formData.email}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isFormData.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isFormData.email && (
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
              'is-danger': isFormData.body,
            })}
            // className="textarea is-danger"
            onChange={handleFormField}
            value={formData.body}
          />
        </div>

        {isFormData.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': loadingData,
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
