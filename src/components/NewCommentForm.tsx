import React, { useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { comments } from '../utils/fetchComments';

type Props = {
  currentPost: Post | null;
  onAddComment?: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  currentPost,
  onAddComment,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', body: '' });
  const [errors, setErrors] = useState({ name: '', email: '', body: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = { name: '', email: '', body: '' };

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!form.body.trim()) {
      newErrors.body = 'Enter some text';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every(err => !err);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentPost || !validate()) {
      return;
    }

    setIsLoading(true);
    try {
      const created = await comments.post<Comment>('/comments', {
        postId: currentPost.id,
        name: form.name,
        email: form.email,
        body: form.body,
      });

      onAddComment?.(created);
      setForm({ name: '', email: '', body: '' });
      setErrors({ name: '', email: '', body: '' });
    } catch (err) {
    } finally {
      setIsLoading(false);
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
            value={form.name}
            onChange={handleChange}
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
            value={form.email}
            onChange={handleChange}
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
            value={form.body}
            onChange={handleChange}
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
            className={`button is-link ${isLoading ? 'is-loading' : ''}`}
            disabled={isLoading}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => setErrors({ name: '', email: '', body: '' })}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
