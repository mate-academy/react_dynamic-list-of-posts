import { FormEvent, useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  onSubmit: (commentData: CommentData) => Promise<void>;
};

type Errors = {
  name: boolean;
  email: boolean;
  body: boolean;
  submit: string;
};

const emptyErrors: Errors = {
  name: false,
  email: false,
  body: false,
  submit: '',
};

export const NewCommentForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<Errors>(emptyErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetErrors = () => {
    setErrors(emptyErrors);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = {
      name: !name.trim(),
      email: !email.trim(),
      body: !body.trim(),
      submit: '',
    };

    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.email || nextErrors.body) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      });

      setBody('');
      resetErrors();
    } catch {
      setErrors(currentErrors => ({
        ...currentErrors,
        submit: 'Unable to add a comment',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');
    resetErrors();
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            id="comment-author-name"
            type="text"
            name="name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': errors.name })}
            value={name}
            onChange={event => {
              setName(event.target.value);
              setErrors(currentErrors => ({
                ...currentErrors,
                name: false,
                submit: '',
              }));
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
            id="comment-author-email"
            type="email"
            name="email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setErrors(currentErrors => ({
                ...currentErrors,
                email: false,
                submit: '',
              }));
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
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={body}
            onChange={event => {
              setBody(event.target.value);
              setErrors(currentErrors => ({
                ...currentErrors,
                body: false,
                submit: '',
              }));
            }}
          />
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {errors.submit && (
        <div className="notification is-danger">{errors.submit}</div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isSubmitting,
            })}
            disabled={isSubmitting}
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
