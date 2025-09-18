import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import PropTypes from 'prop-types';

type Props = {
  onSubmit: (comment: Omit<Comment, 'id'>) => Promise<void>;
  selectedPost?: Post;
};

type FormState = {
  name: string;
  email: string;
  body: string;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit, selectedPost }) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    body: '',
  });

  const [errors, setErrors] = useState<FormState>({
    name: '',
    email: '',
    body: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleChange<K extends keyof FormState>(key: K, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  }

  function clearForm() {
    setForm({ name: '', email: '', body: '' });
    setErrors({ name: '', email: '', body: '' });
  }

  function resetBody() {
    setForm(prev => ({ ...prev, body: '' }));
    setErrors(prev => ({ ...prev, body: '' }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedPost?.id) {
      return;
    }

    const newErrors: FormState = {
      name: form.name.trim() ? '' : 'Name is required',
      email: form.email.trim() ? '' : 'Email is required',
      body: form.body.trim() ? '' : 'Comment is required',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        body: form.body.trim(),
        postId: selectedPost.id,
      };

      await onSubmit(payload);
      resetBody();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

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
            className={classNames('input', {
              'is-danger': errors.name,
            })}
            value={form.name}
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
              'is-danger': errors.email,
            })}
            value={form.email}
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
              'is-danger': errors.body,
            })}
            value={form.body}
            onChange={e => handleChange('body', e.target.value)}
          />
        </div>

        {errors.body && (
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
            disabled={isLoading}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

NewCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  selectedPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
};
