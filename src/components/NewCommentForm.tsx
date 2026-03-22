import { useState } from 'react';

type Props = {
  onSubmit: (data: {
    name: string;
    email: string;
    body: string;
  }) => Promise<void>;
  submitError: string;
};

type Errors = {
  name: string;
  email: string;
  body: string;
};

const initialErrors: Errors = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit, submitError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<Errors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {
      name: name.trim() ? '' : 'Name is required',
      email: email.trim() ? '' : 'Email is required',
      body: body.trim() ? '' : 'Comment is required',
    };

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email && !newErrors.body;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      });

      setBody('');
      setErrors(initialErrors);
    } catch {
      // error is handled in App.tsx
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors(initialErrors);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleClear}
      data-cy="NewCommentForm"
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-name">
          Author Name
        </label>

        <div className="control has-icons-right">
          <input
            id="comment-name"
            type="text"
            className={`input ${errors.name ? 'is-danger' : ''}`}
            placeholder="Enter your name"
            value={name}
            onChange={event => {
              setName(event.target.value);
              setErrors(current => ({
                ...current,
                name: '',
              }));
            }}
          />

          {errors.name && (
            <span className="icon is-small is-right" data-cy="ErrorIcon">
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
        <label className="label" htmlFor="comment-email">
          Email
        </label>

        <div className="control has-icons-right">
          <input
            id="comment-email"
            type="email"
            className={`input ${errors.email ? 'is-danger' : ''}`}
            placeholder="Enter your email"
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setErrors(current => ({
                ...current,
                email: '',
              }));
            }}
          />

          {errors.email && (
            <span className="icon is-small is-right" data-cy="ErrorIcon">
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
          Comment
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            className={`textarea ${errors.body ? 'is-danger' : ''}`}
            placeholder="Type comment here"
            value={body}
            onChange={event => {
              setBody(event.target.value);
              setErrors(current => ({
                ...current,
                body: '',
              }));
            }}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      {submitError && (
        <div className="notification is-danger is-light">{submitError}</div>
      )}

      <div className="field is-grouped mt-4">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isSubmitting ? 'is-loading' : ''}`}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button type="reset" className="button is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
