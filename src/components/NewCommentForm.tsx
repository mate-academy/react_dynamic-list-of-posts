import React, { useState } from 'react';
import cn from 'classnames';

import { CommentData, Comment } from '../types/Comment';
import { useError } from '../hooks/useError';

type CommentErrors = {
  [T in keyof CommentData]: string[];
};

type Props = {
  postId: number;
  onSubmit: (postId: number, commentData: CommentData) => Promise<Comment>;
};

const NewCommentFormBase: React.FC<Props> = ({ postId, onSubmit }) => {
  const [formData, setFormData] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });

  const [formErrors, setFormErrors] = useState<CommentErrors>({
    name: [],
    email: [],
    body: [],
  });

  const { error, clearErrorMessage, setErrorMessage } = useError();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const addFormError = (field: keyof CommentData, errorMessage: string) => {
    if (formErrors[field].includes(errorMessage)) {
      return;
    }

    setFormErrors(prevState => {
      return {
        ...prevState,
        [field]: [...prevState[field], errorMessage],
      };
    });
  };

  const clearFormError = (field: keyof CommentData) => {
    setFormErrors(prevState => {
      return {
        ...prevState,
        [field]: [],
      };
    });
  };

  const clearAllFormErrors = () => {
    setFormErrors({
      name: [],
      email: [],
      body: [],
    });
  };

  const clearForm = () => {
    clearAllFormErrors();
    setFormData(prevState => {
      return {
        ...prevState,
        body: '',
      };
    });
  };

  const validateForm = () => {
    let isValid = true;

    // Validation Rules
    const hasName = formData.name.trim() !== '';
    const hasEmail = formData.email.trim() !== '';
    const hasBody = formData.body.trim() !== '';

    if (!hasName) {
      addFormError('name', 'Name is required');
      isValid = false;
    }

    if (!hasEmail) {
      addFormError('email', 'Email is required');
      isValid = false;
    }

    if (!hasBody) {
      addFormError('body', 'Enter some text');
      isValid = false;
    }

    if (!hasBody || !hasEmail || !hasName) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    clearErrorMessage();
    clearAllFormErrors();

    onSubmit(postId, formData)
      .then(() => {
        clearForm();
      })
      .catch(() => {
        setErrorMessage('Cannot create comment.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof CommentData,
  ) => {
    clearFormError(field);

    setFormData(prevState => {
      return {
        ...prevState,
        [field]: e.target.value,
      };
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            onChange={e => handleFormFieldChange(e, 'name')}
            value={formData.name}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': formErrors.name.length > 0,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.name.length > 0 && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.name.length > 0 &&
          formErrors.name.map(err => (
            <p className="help is-danger" data-cy="ErrorMessage" key={err}>
              {err}
            </p>
          ))}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={formData.email}
            onChange={e => handleFormFieldChange(e, 'email')}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': formErrors.email.length > 0,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.email.length > 0 && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {formErrors.email.length > 0 &&
          formErrors.email.map(err => (
            <p className="help is-danger" data-cy="ErrorMessage" key={err}>
              {err}
            </p>
          ))}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            value={formData.body}
            onChange={e => handleFormFieldChange(e, 'body')}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': formErrors.body.length > 0,
            })}
          />
        </div>

        {formErrors.body.length > 0 &&
          formErrors.body.map(err => (
            <p className="help is-danger" data-cy="ErrorMessage" key={err}>
              {err}
            </p>
          ))}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', {
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
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
      {error.id && (
        <div className="notification is-danger">{error.message}</div>
      )}
    </form>
  );
};

export const NewCommentForm = React.memo(NewCommentFormBase);
