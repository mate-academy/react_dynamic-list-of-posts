import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface Props {
  onAdd: (comment: Comment) => void;
  postId: number;
  onError: () => void;
}

export const NewCommentForm: React.FC<Props> = ({ onAdd, postId, onError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      name: name.trim() === '',
      email: email.trim() === '',
      body: body.trim() === '',
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.body) {
      return;
    }

    setIsSubmitting(true);

    client
      .post('/comments', {
        postId,
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      })
      .then(newComment => {
        onAdd(newComment);

        setBody('');
      })
      .catch(() => {
        onError();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({
      name: false,
      email: false,
      body: false,
    });
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
            value={name}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input ${errors.name ? 'is-danger' : ''}`}
            onChange={event => {
              const value = event.target.value;

              setName(value);

              if (errors.name) {
                setErrors(prev => ({
                  ...prev,
                  name: false,
                }));
              }
            }}
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
            value={email}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${errors.email ? 'is-danger' : ''}`}
            onChange={event => {
              const value = event.target.value;

              setEmail(value);

              if (errors.email) {
                setErrors(prev => ({
                  ...prev,
                  email: false,
                }));
              }
            }}
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
            value={body}
            onChange={event => {
              const value = event.target.value;

              setBody(value);

              if (errors.body) {
                setErrors(prev => ({
                  ...prev,
                  body: false,
                }));
              }
            }}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={`textarea ${errors.body ? 'is-danger' : ''}`}
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
            className={`button is-link ${isSubmitting ? 'is-loading' : ''}`}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
