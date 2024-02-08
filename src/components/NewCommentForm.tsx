import React, { useState } from 'react';
import cn from 'classnames';
import { addComment } from '../api/posts';
import { Comment } from '../types/Comment';

interface Props {
  postId: number;
  onAddComment: (comment: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const initialFormData = {
    name: '',
    email: '',
    body: '',
    postId,
  };

  const [formData, setFormData]
    = useState<Omit<Comment, 'id'>>(initialFormData);
  const [formErrors, setFormErrors]
    = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (data: Omit<Comment, 'id'>) => {
    const errors: Record<string, string> = {};

    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    }

    if (!data.body.trim()) {
      errors.body = 'Enter some text';
    }

    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(formData);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);

      addComment(formData)
        .then((comment) => {
          onAddComment(comment);
          setFormData({ ...formData, body: '' });
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    } else {
      setFormErrors(errors);
    }
  };

  const handleClearAll = () => {
    setFormData(initialFormData);
    setFormErrors(null);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
            className={cn('input',
              { 'is-danger': formErrors?.name })}
            value={formData.name}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {formErrors?.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors?.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formErrors?.name}
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
            className={cn('input',
              { 'is-danger': formErrors?.email })}
            value={formData.email}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors?.email && (
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
            {formErrors?.email}
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
            className={cn('textarea',
              { 'is-danger': formErrors?.body })}
            value={formData.body}
            onChange={handleInputChange}
          />
        </div>
        {formErrors?.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {formErrors?.body}
          </p>
        )}

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isLoading })}
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
