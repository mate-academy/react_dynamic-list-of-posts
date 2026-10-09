import React from 'react';
import { CommentData } from '../types/Comment';
import cn from 'classnames';

type NewCommentFormProps = {
  onAddComment: (commentData: CommentData) => Promise<void>;
};

type ValidationErrors = {
  name?: string;
  email?: string;
  body?: string;
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  onAddComment,
}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [body, setBody] = React.useState('');
  const [validationErrors, setValidationErrors] =
    React.useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: ValidationErrors = {
      name: name.trim() === '' ? 'Name is required' : undefined,
      email: email.trim() === '' ? 'Email is required' : undefined,
      body: body.trim() === '' ? 'Comment text is required' : undefined,
    };

    setValidationErrors(errors);

    if (Object.values(errors).some(error => error !== undefined)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onAddComment({ name, email, body });
      setBody('');
    } catch {
      // error notification is shown in PostDetails
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (validationErrors.name) {
      setValidationErrors(prevErrors => ({ ...prevErrors, name: undefined }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (validationErrors.email) {
      setValidationErrors(prevErrors => ({ ...prevErrors, email: undefined }));
    }
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    if (validationErrors.body) {
      setValidationErrors(prevErrors => ({ ...prevErrors, body: undefined }));
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setValidationErrors({});
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
            className={cn('input', { 'is-danger': validationErrors.name })}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {validationErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {validationErrors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {validationErrors.name}
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
            className={cn('input', { 'is-danger': validationErrors.email })}
            value={email}
            onChange={handleEmailChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {validationErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {validationErrors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {validationErrors.email}
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
            className={cn('textarea', { 'is-danger': validationErrors.body })}
            value={body}
            onChange={handleBodyChange}
          />
        </div>
        {validationErrors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {validationErrors.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isSubmitting })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
