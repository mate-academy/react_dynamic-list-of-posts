import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  onSubmit: (name: string, email: string, body: string) => Promise<void>;
  isLoading: boolean;
};

const initialInputs = {
  name: '',
  email: '',
  body: '',
};

const initialErrors = {
  name: false,
  email: false,
  body: false,
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [inputs, setInputs] = useState(initialInputs);
  const [haveInputsErrors, setHaveInputsErrors] = useState(initialErrors);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setHaveInputsErrors({
      ...haveInputsErrors,
      [event.target.name]: false,
    });
    setInputs(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedName = inputs.name.trim();
    const trimmedEmail = inputs.email.trim();
    const trimmedBody = inputs.body.trim();

    if (!trimmedEmail) {
      setHaveInputsErrors(current => ({ ...current, email: true }));
    }

    if (!trimmedBody) {
      setHaveInputsErrors(current => ({ ...current, body: true }));
    }

    if (!trimmedName) {
      setHaveInputsErrors(current => ({ ...current, name: true }));
    }

    if (!trimmedName || !trimmedEmail || !trimmedBody) {
      return;
    }

    onSubmit(trimmedName, trimmedEmail, trimmedBody)
      .then(() => {
        setInputs(currentInputs => ({ ...currentInputs, body: '' }));
      })
      .catch(() => {});
  };

  const handleReset = () => {
    setInputs(initialInputs);
    setHaveInputsErrors(initialErrors);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
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
            className={classNames(
              'input',
              { 'is-danger': haveInputsErrors.name },
            )}
            value={inputs.name}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {haveInputsErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {haveInputsErrors.name && (
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
            className={classNames(
              'input',
              { 'is-danger': haveInputsErrors.email },
            )}
            value={inputs.email}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {haveInputsErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {haveInputsErrors.email && (
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
            className={classNames(
              'textarea',
              { 'is-danger': haveInputsErrors.body },
            )}
            value={inputs.body}
            onChange={handleInputChange}
          />
        </div>

        {haveInputsErrors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button is-link',
              { 'is-loading': isLoading },
            )}
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
