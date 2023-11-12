import React, { useState } from 'react';
import cn from 'classnames';

import { CommentData } from '../types/Comment';

type Props = {
  onAddComment: (commentData: CommentData) => void;
  isAddingComment: boolean;
};

interface FormState {
  name: string,
  email: string,
  body: string,
}

interface FormError {
  nameError: boolean,
  emailError: boolean,
  bodyError: boolean,
}

export const NewCommentForm: React.FC<Props> = ({
  onAddComment,
  isAddingComment,
}) => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    body: '',
  });
  const [formError, setFormError] = useState<FormError>({
    nameError: false,
    emailError: false,
    bodyError: false,
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prevState => ({ ...prevState, name: event.target.value }));
    setFormError(prevState => ({ ...prevState, nameError: false }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prevState => ({ ...prevState, email: event.target.value }));
    setFormError(prevState => ({ ...prevState, emailError: false }));
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState(prevState => ({ ...prevState, body: event.target.value }));
    setFormError(prevState => ({ ...prevState, bodyError: false }));
  };

  const handleReset = () => {
    setFormState({ name: '', email: '', body: '' });
    setFormError({ nameError: false, emailError: false, bodyError: false });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, body } = formState;

    setFormError({
      nameError: !name,
      emailError: !email,
      bodyError: !body,
    });

    if (!name || !email || !body) {
      return;
    }

    onAddComment({ name, email, body });
    setFormState(prevState => ({ ...prevState, body: '' }));
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
            className={cn('input', {
              'is-danger': formError.nameError,
            })}
            value={formState.name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className={cn('icon is-small is-right has-text-danger', {
              'is-hidden': !formError.nameError,
            })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p
          className={cn('help is-danger', {
            'is-hidden': !formError.nameError,
          })}
          data-cy="ErrorMessage"
        >
          Name is required
        </p>
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
              'is-danger': formError.emailError,
            })}
            value={formState.email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className={cn('icon is-small is-right has-text-danger', {
              'is-hidden': !formError.emailError,
            })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p
          className={cn('help is-danger', {
            'is-hidden': !formError.emailError,
          })}
          data-cy="ErrorMessage"
        >
          Email is required
        </p>
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
              'is-danger': formError.bodyError,
            })}
            value={formState.body}
            onChange={handleBodyChange}
          />
        </div>

        <p
          className={cn('help is-danger', {
            'is-hidden': !formError.bodyError,
          })}
          data-cy="ErrorMessage"
        >
          Enter some text
        </p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isAddingComment,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
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
