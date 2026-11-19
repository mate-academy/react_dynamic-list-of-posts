import { useState, FormEvent, ChangeEvent } from 'react';
import { client } from '../utils/fetchClient';
import { CommentData, Comment } from '../types/Comment';

interface NewCommentFormProps {
  postId: number;
  onSubmit: (comment: Comment) => void;
}

export const NewCommentForm = ({ postId, onSubmit }: NewCommentFormProps) => {
  const [formData, setFormData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [errors, setErrors] = useState<Partial<CommentData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validate = (): boolean => {
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

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof CommentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (submitted && errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    if (submitError) {
      setSubmitError(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setSubmitError(false);
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const response = await client.post<Comment>('/comments', {
        ...formData,
        postId,
      });

      onSubmit(response);
      setFormData(prev => ({ ...prev, body: '' }));
    } catch {
      setSubmitError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData({ name: '', email: '', body: '' });
    setErrors({});
    setSubmitted(false);
    setSubmitError(false);
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
            className={`input ${submitted && errors.name ? 'is-danger' : ''}`}
            value={formData.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('name', e.target.value)
            }
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('email', e.target.value)
            }
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
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleChange('body', e.target.value)
            }
          />
        </div>

        {submitted && errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      {submitError && (
        <p className="help is-danger" data-cy="AddCommentError">
          Unable to add a comment
        </p>
      )}

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
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
