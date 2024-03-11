/* eslint-disable no-console */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { addComment } from '../api/posts';

type Props = {
  selectedPostId: number;
  onAddComment: (newComment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  onAddComment,
}) => {
  const startFormData = {
    postId: selectedPostId,
    name: '',
    email: '',
    body: '',
  };

  const [formData, setFormData] = useState<Omit<Comment, 'id'>>(startFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

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

  const handleClearAll = () => {
    setFormData(startFormData);
    setFormErrors(null);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData(prevData => ({ ...prevData, [name]: value }));
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const errors = validateData(formData);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      addComment(formData)
        .then(comment => {
          onAddComment(comment);
          setFormData({ ...formData, body: '' });
        })
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
            value={formData.name}
            id="comment-author-name"
            placeholder="Name Surname"
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
            value={formData.email}
            id="comment-author-email"
            placeholder="email@test.com"
            onChange={handleInputChange}
            className={classNames('input', {
              'is-danger': formErrors?.email,
            })}
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
            value={formData.body}
            placeholder="Type comment here"
            onChange={handleInputChange}
            className={classNames('textarea', {
              'is-danger': formErrors?.body,
            })}
          />
        </div>

        {!!formErrors?.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formErrors.body}
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
            onClick={handleClearAll}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
