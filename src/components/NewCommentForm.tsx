import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { createComment } from '../utils/api';

interface Props {
  postId: number;
  onAdd: (comment: Comment) => void;
}

export const NewCommentForm: React.FC<Props> = ({ postId, onAdd }) => {
  // Стан полів форми
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  // Стан помилок валідації
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  // Стани завантаження та помилки сервера
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Валідація перед відправкою
  const validate = () => {
    const newErrors = {
      name: !name.trim(),
      email: !email.trim() || !email.includes('@'), // Базова перевірка на наявність @
      body: !body.trim(),
    };

    setErrors(newErrors);

    // Якщо хоча б одне поле має помилку, повертаємо false
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(false);

    // Показуємо помилки тільки після спроби сабміту
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    createComment({ postId, name, email, body })
      .then(newComment => {
        // Передаємо новий коментар наверх, щоб він додався в список
        onAdd(newComment);
        // Залишаємо name та email, але очищаємо текст коментаря
        setBody('');
      })
      .catch(() => {
        // Обробка помилки додавання (*)
        setSubmitError(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Очищення форми та всіх помилок
  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({ name: false, email: false, body: false });
    setSubmitError(false);
  };

  // Універсальний обробник змін для полів
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof errors,
  ) => {
    const value = e.target.value;

    if (field === 'name') {
      setName(value);
    }

    if (field === 'email') {
      setEmail(value);
    }

    if (field === 'body') {
      setBody(value);
    }

    // Прибираємо помилку конкретного поля при його зміні
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="name">
          Author Name
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            id="name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': errors.name })}
            value={name}
            onChange={e => handleChange(e, 'name')}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle"></i>
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
        <label className="label" htmlFor="email">
          Author Email
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            id="email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
            value={email}
            onChange={e => handleChange(e, 'email')}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle"></i>
            </span>
          )}
        </div>
        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Valid email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="body">
          Comment Text
        </label>
        <div className="control">
          <textarea
            id="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={body}
            onChange={e => handleChange(e, 'body')}
          ></textarea>
        </div>
        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Comment text is required
          </p>
        )}
      </div>

      {submitError && (
        <div className="notification is-danger" data-cy="SubmitError">
          Failed to add comment. Please try again.
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isSubmitting,
            })}
          >
            Add
          </button>
        </div>
        <div className="control">
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
