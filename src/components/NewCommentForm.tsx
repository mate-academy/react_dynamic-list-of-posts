import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { addComment } from '../api/api';

type Props = {
  postId: number;
  onAddNewComment: (newComment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onAddNewComment,
}) => {
  const formValues = {
    postId,
    name: '',
    email: '',
    body: '',
  };

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Comment, 'id'>>(formValues);
  const [formErrors, setFormErrors] = useState<Record<string, string> | null>(
    null,
  );

  const validateData = ({ name, body, email }: Omit<Comment, 'id'>) => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!body.trim()) {
      errors.body = 'Enter some text';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    }

    return errors;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFormClear = () => {
    setFormData(formValues);
    setFormErrors(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validateData(formData);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      addComment(formData)
        .then(comment => {
          onAddNewComment(comment);
          setFormData({ ...formData, body: '' });
        })
        // eslint-disable-next-line no-console
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false));
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
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
            value={formData.name}
            onChange={handleInputChange}
            className={classNames('input', {
              'is-danger': formErrors?.name,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!!formErrors?.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!!formErrors?.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formErrors.name}
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
            value={formData.email}
            onChange={handleInputChange}
            className={classNames('input', { 'is-danger': formErrors?.email })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!!formErrors?.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!!formErrors?.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formErrors.email}
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
            value={formData.body}
            onChange={handleInputChange}
            className={classNames('textarea', {
              'is-danger': formErrors?.body,
            })}
          />
        </div>

        {!!formErrors?.body && (
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
              'is-loading': isLoading,
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
            onClick={handleFormClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
