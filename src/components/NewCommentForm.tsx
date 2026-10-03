import React, { useState, FormEvent } from 'react';
import { addComment } from '../utils/apiComments';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  onCommentAdded: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onCommentAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const isNameEmpty = !name.trim();
    const isEmailEmpty = !email.trim();
    const isBodyEmpty = !body.trim();

    setNameError(isNameEmpty);
    setEmailError(isEmailEmpty);
    setBodyError(isBodyEmpty);

    if (isNameEmpty || isEmailEmpty || isBodyEmpty) {
      return;
    }

    setIsSubmitting(true);

    addComment(postId, {
      name,
      email,
      body,
    })
      .then(comment => {
        onCommentAdded(comment);
        setBody('');
        setSubmitError('');
      })
      .catch(() => {
        setSubmitError('Unable to add comment. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setBody('');

    setNameError(false);
    setEmailError(false);
    setBodyError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="comment-name">
          Name
        </label>

        <div className="control has-icons-right" data-cy="NameField">
          <input
            id="comment-name"
            className={`input ${nameError ? 'is-danger' : ''}`}
            type="text"
            placeholder="Name"
            value={name}
            onChange={event => {
              setName(event.target.value);
              setNameError(false);
            }}
          />

          {nameError && (
            <span className="icon is-small is-right" data-cy="ErrorIcon">
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

          {nameError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Name is required
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="comment-email">
          Email
        </label>

        <div className="control has-icons-right" data-cy="EmailField">
          <input
            id="comment-email"
            className={`input ${emailError ? 'is-danger' : ''}`}
            type="email"
            placeholder="Email"
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setEmailError(false);
            }}
          />

          {emailError && (
            <span className="icon is-small is-right" data-cy="ErrorIcon">
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

          {emailError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Email is required
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="comment-body">
          Comment
        </label>

        <div className="control" data-cy="BodyField">
          <textarea
            id="comment-body"
            className={`textarea ${bodyError ? 'is-danger' : ''}`}
            placeholder="Comment"
            value={body}
            onChange={event => {
              setBody(event.target.value);
              setBodyError(false);
            }}
          />
          {bodyError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Comment is required
            </p>
          )}
        </div>
      </div>

      {submitError && (
        <div
          className="notification is-danger"
          role="alert"
          data-cy="SubmitError"
        >
          {submitError}
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="SubmitButton"
            className={`button is-link ${isSubmitting ? 'is-loading' : ''}`}
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            data-cy="ClearButton"
            className="button is-light"
            onClick={handleClear}
            disabled={isSubmitting}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
