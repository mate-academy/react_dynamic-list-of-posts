import React, { useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface NewCommentFormProps {
  postId: number;
  onCommentAdded: (comment: Comment) => void;
}
export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  postId,
  onCommentAdded,
}) => {
  const initialFormState: CommentData = {
    name: '',
    email: '',
    body: '',
  };
  const [formData, setFormData] = useState<CommentData>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CommentData>>({});

  const validate = (): Partial<CommentData> => {
    const newErrors: Partial<CommentData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Enter some text';
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof CommentData]) {
      setErrors(prev => {
        const { [name as keyof CommentData]: removed, ...rest } = prev;

        return rest;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      const newComment = await client.post<Comment>('/comments', {
        ...formData,
        postId,
      });

      onCommentAdded(newComment);
      setFormData(prev => ({ ...prev, body: '' }));
      setErrors({});
      setSubmitted(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to add comment', error);
    } finally {
      setLoading(false);
      // setFormData(initialFormState);
    }
  };

  const handleClear = () => {
    setErrors({});
    setFormData(initialFormState);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleClear}
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
            className={`input ${submitted && errors.name ? 'is-danger' : ''}`}
            value={formData.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {submitted && errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {submitted && errors.name && (
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${submitted && errors.email ? 'is-danger' : ''}`}
            value={formData.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {submitted && errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {submitted && errors.email && (
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
            className={`textarea ${submitted && errors.body ? 'is-danger' : ''}`}
            value={formData.body}
            onChange={handleChange}
          />
        </div>
        {submitted && errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${loading ? 'is-loading' : ''}`}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            // onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
