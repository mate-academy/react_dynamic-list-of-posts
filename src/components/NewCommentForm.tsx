import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  postId: number;
  onAddComment: (
    commentData: CommentData & { postId: number },
  ) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [formData, setFormData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [errors, setErrors] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: CommentData = {
      name: !formData.name.trim() ? 'Name is required' : '',
      email: !formData.email.trim() ? 'Email is required' : '',
      body: !formData.body.trim() ? 'Enter some text' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddComment({ ...formData, postId });
      setFormData(prev => ({ ...prev, body: '' }));
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof CommentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
            className={`input ${errors.name ? 'is-danger' : ''}`}
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.name}
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
            className={`input ${errors.email ? 'is-danger' : ''}`}
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.email}
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
            className={`textarea ${errors.body ? 'is-danger' : ''}`}
            value={formData.body}
            onChange={e => handleChange('body', e.target.value)}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isSubmitting ? 'is-loading' : ''}`}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              setFormData({ name: '', email: '', body: '' });
              setErrors({ name: '', email: '', body: '' });
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
