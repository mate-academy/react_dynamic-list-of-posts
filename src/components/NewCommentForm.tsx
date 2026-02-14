import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  postId: number;
  onCommentAdded: (comment: Comment) => void;
};

type Errors = {
  name?: string;
  email?: string;
  body?: string;
};

const ERROR_TEXT = 'Something went wrong';

export const NewCommentForm: React.FC<Props> = ({ postId, onCommentAdded }) => {
  //#region States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  //#endregion

  //#region Validation
  const isValidEmail = (emailValue: string): boolean => {
    const emailRegex = new RegExp(
      '^' +
        '[a-zA-Z0-9._-]+' +
        '@' +
        '[a-zA-Z0-9.-]+' +
        '\\.' +
        '[a-zA-Z]{2,}' +
        '$',
    );

    return emailRegex.test(emailValue);
  };
  //#endregion

  //#region Handles
  const handleFieldChange = (field: keyof Errors, value: string) => {
    if (field === 'name') {
      setName(value);
    }

    if (field === 'email') {
      setEmail(value);
    }

    if (field === 'body') {
      setBody(value);
    }

    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email.trim())) {
      newErrors.email = 'Email is not valid';
    }

    if (!body.trim()) {
      newErrors.body = 'Enter some text';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    setIsLoading(true);

    const commentData = {
      postId,
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
    };

    client
      .post<Comment>('/comments', commentData)
      .then(newComment => {
        onCommentAdded(newComment);
        setBody('');
        setErrors({});
      })
      .catch(() => {
        setErrors({ name: ERROR_TEXT });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({});
  };
  //#endregion

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
            value={name}
            onChange={e => handleFieldChange('name', e.target.value)}
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${errors.email ? 'is-danger' : ''}`}
            value={email}
            onChange={e => handleFieldChange('email', e.target.value)}
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
            value={body}
            onChange={e => handleFieldChange('body', e.target.value)}
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
