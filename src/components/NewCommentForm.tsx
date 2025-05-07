import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  addComment: (data: CommentData) => void;
  setInputName: React.Dispatch<React.SetStateAction<string>>;
  setInputBody: React.Dispatch<React.SetStateAction<string>>;
  setInputEmail: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  inputName: string;
  inputEmail: string;
  inputBody: string;
};

export const NewCommentForm: React.FC<Props> = ({
  addComment,
  isLoading,
  setInputName,
  setInputBody,
  setInputEmail,
  inputBody,
  inputEmail,
  inputName,
}) => {
  const [inputNameError, setInputNameError] = useState(false);
  const [inputEmailError, setInputEmailError] = useState(false);
  const [inputBodyError, setInputBodyError] = useState(false);

  const clearInput = () => {
    setInputBody('');
    setInputEmail('');
    setInputName('');
    setInputNameError(false);
    setInputEmailError(false);
    setInputBodyError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nameError = inputName.trim() ? '' : 'Name is required';
    const emailError = inputEmail.trim() ? '' : 'Email is required';
    const bodyError = inputBody.trim() ? '' : 'Enter some text';

    setInputNameError(!!nameError);
    setInputEmailError(!!emailError);
    setInputBodyError(!!bodyError);

    if (nameError || emailError || bodyError) {
      return;
    }

    addComment({ name: inputName, email: inputEmail, body: inputBody });
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
            className={`input ${inputNameError ? 'is-danger' : ''}`}
            value={inputName}
            disabled={isLoading}
            onChange={event => {
              setInputName(event.target.value);
              setInputNameError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {inputNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputNameError && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${inputEmailError ? 'is-danger' : ''}`}
            disabled={isLoading}
            value={inputEmail}
            onChange={event => {
              setInputEmail(event.target.value);
              setInputEmailError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {inputEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {inputEmailError && (
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
            className={`textarea ${inputBodyError ? 'is-danger' : ''}`}
            disabled={isLoading}
            value={inputBody}
            onChange={event => {
              setInputBody(event.target.value);
              setInputBodyError(false);
            }}
          />
        </div>

        {inputBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
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
            onClick={() => clearInput()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
