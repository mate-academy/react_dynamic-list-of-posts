import React, { useState } from 'react';

export const NewCommentForm: React.FC<{
  onSubmit: (comment: {
    name: string;
    email: string;
    body: string;
  }) => Promise<void>;
}> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', body: '' });
  const [errors, setErrors] = useState({ name: '', email: '', body: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on field change
  };

  const validate = () => {
    const newErrors: { name: string; email: string; body: string } = {
      name: '',
      email: '',
      body: '',
    };

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }

    if (!formData.body) {
      newErrors.body = 'Enter some text';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);

      return;
    }

    setIsLoading(true);
    onSubmit(formData)
      .then(() => {
        setFormData(prev => ({ ...prev, body: '' })); // Clear body only
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error('Failed to submit comment', err))
      .finally(() => setIsLoading(false));
  };

  const handleClear = () => {
    setFormData({ name: '', email: '', body: '' });
    setErrors({ name: '', email: '', body: '' });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      {/* Name Field */}
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
            className={`input ${errors.name ? 'is-danger' : ''}`}
            value={formData.name}
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {errors.name && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {errors.name}
            </p>
          )}
        </div>
      </div>

      {/* Email Field */}
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
            className={`input ${errors.email ? 'is-danger' : ''}`}
            value={formData.email}
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {errors.email && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Body Field */}
      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>
        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={`textarea ${errors.body ? 'is-danger' : ''}`}
            value={formData.body}
            onChange={handleChange}
          />
          {errors.body && (
            <p className="help is-danger" data-cy="ErrorMessage">
              {errors.body}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isLoading ? 'is-loading' : ''}`}
          >
            Add
          </button>
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
