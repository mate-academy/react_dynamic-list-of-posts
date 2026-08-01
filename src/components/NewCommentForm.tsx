import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

interface Props {
  onSubmit: (newComment: CommentData) => Promise<void>;
  isSubmitting: boolean;
}

export const NewCommentForm: React.FC<Props> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    // оновлюємо стан форми, зберігаючи попередні значення та змінюючи лише поточне
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = { name: '', email: '', body: '' };
    let isValid = true;

    // перевірка імені
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // перевірка мейлу// .
    if (
      !formData.email.trim() ||
      !formData.email.includes('@') ||
      !formData.email.includes('.')
    ) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    // перевірка тексту коментаря
    if (!formData.body.trim()) {
      newErrors.body = 'Enter some text';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitted(true);

    // валідуємось
    if (!validateForm()) {
      return;
    }

    onSubmit(formData).then(() => {
      // Очищаємо лише текст коментаря, а ім'я та email залишаємо
      setFormData(prev => ({
        ...prev,
        body: '',
      }));
      setErrors({ name: '', email: '', body: '' });
      setIsSubmitted(false);
    });
  };

  const handleClear = () => {
    setFormData({ name: '', email: '', body: '' });
    setErrors({ name: '', email: '', body: '' });
    setIsSubmitted(false);
  };

  return (
    <form onSubmit={handleSubmit} data-cy="NewCommentForm">
      {/* Поле імені */}
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
            className={`input ${isSubmitted && errors.name ? 'is-danger' : ''}`}
            value={formData.name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isSubmitted && errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isSubmitted && errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.name}
          </p>
        )}
      </div>

      {/* Поле Email */}
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
            className={`input ${isSubmitted && errors.email ? 'is-danger' : ''}`}
            value={formData.email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isSubmitted && errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isSubmitted && errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.email}
          </p>
        )}
      </div>

      {/* Поле тексту коментаря */}
      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={`textarea ${isSubmitted && errors.body ? 'is-danger' : ''}`}
            value={formData.body}
            onChange={handleChange}
          />
        </div>

        {isSubmitted && errors.body && (
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
            disabled={isSubmitting}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
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
