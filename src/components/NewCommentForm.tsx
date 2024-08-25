import React, { useState } from 'react';
import cn from 'classnames';
import { addComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

type FormData = {
  name: string;
  email: string;
  body: string;
};

const initialFormData: FormData = {
  name: '',
  email: '',
  body: '',
};

enum FormField {
  name = 'name',
  email = 'email',
  body = 'body',
}

type Props = {
  postId: number;
  onAddComment: (newComment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onAddComment }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<(keyof FormData)[]>([]);
  const [isSubmiting, setIsSubmiting] = useState(false);

  function handleHelper(fieldName: keyof FormData, value: string) {
    setFormData(prevFormData => ({
      ...prevFormData,
      [fieldName]: value,
    }));
    setErrors((prevErrors: (keyof FormData)[]) =>
      prevErrors.filter(error => error !== fieldName),
    );
  }

  function handleFormSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentErrors: (keyof FormData)[] = [];

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        currentErrors.push(key as keyof FormData);
      }
    });

    if (currentErrors.length > 0) {
      setErrors(currentErrors);

      return;
    }

    const commentData: CommentData = {
      postId,
      ...formData,
    };

    setIsSubmiting(true);
    addComments(commentData)
      .then((data: Comment) => {
        onAddComment(data);
        setFormData(prevFormData => ({ ...prevFormData, body: '' }));
      })
      .finally(() => setIsSubmiting(false));
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;

    handleHelper(FormField.name, value);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;

    handleHelper(FormField.email, value);
  }

  function handleTexteareaChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void {
    const value = event.target.value;

    handleHelper(FormField.body, value);
  }

  function handleClearForm() {
    setFormData(initialFormData);
    setErrors([]);
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
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
            className={cn('input', {
              'is-danger': errors.includes(FormField.name),
            })}
            onChange={handleNameChange}
            value={formData.name}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.includes(FormField.name) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.includes(FormField.name) && (
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
            className={cn('input', {
              'is-danger': errors.includes(FormField.email),
            })}
            onChange={handleEmailChange}
            value={formData.email}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {errors.includes(FormField.email) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.includes(FormField.email) && (
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
            className={cn('textarea', {
              'is-danger': errors.includes(FormField.body),
            })}
            onChange={handleTexteareaChange}
            value={formData.body}
          />
        </div>

        {errors.includes(FormField.body) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isSubmiting })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
