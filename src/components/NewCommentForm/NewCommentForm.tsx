import React, { useState } from 'react';
import classNames from 'classnames';
import { TextField } from '../TextField';

export const NewCommentForm: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const [hasUserNameError, setHasUserNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasTextError, setHasTextError] = useState(false);

  const [formKey, setFormKey] = useState(0);
  const handleFormClear = () => {
    setUserName('');
    setEmail('');
    setText('');

    setFormKey(prevKey => prevKey + 1);
  };

  const handleFormSubmit = (submitEvent: React.SyntheticEvent) => {
    submitEvent.preventDefault();

    setHasUserNameError(!userName);
    setHasEmailError(!email);
    setHasTextError(!text);

    if (userName && email && text) {
      // console.log('Success adding new comment');

      setText('');
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      key={formKey}
      onSubmit={handleFormSubmit}
    >
      <TextField
        dataCy="NameField"
        id="comment-author-name"
        label="Author Name"
        name="name"
        placeholder="Name Surname"
        errorMessage="Name is required"
        value={userName}
        onChange={setUserName}
        hasError={hasUserNameError}
        onError={setHasUserNameError}
      >
        <span className="icon is-small is-left">
          <i className="fas fa-user" />
        </span>
      </TextField>

      <TextField
        dataCy="EmailField"
        id="comment-author-email"
        label="Author Email"
        name="email"
        placeholder="email@test.com"
        errorMessage="Email is required"
        value={email}
        onChange={setEmail}
        hasError={hasEmailError}
        onError={setHasEmailError}
      >
        <span className="icon is-small is-left">
          <i className="fas fa-envelope" />
        </span>
      </TextField>

      <TextField
        textArea
        dataCy="BodyField"
        id="comment-body"
        label="Comment Text"
        name="body"
        placeholder="Type comment here"
        errorMessage="Enter some text"
        value={text}
        onChange={setText}
        hasError={hasTextError}
        onError={setHasTextError}
      />

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
              {
                'is-danger': hasUserNameError,
              },
            )}
            value={userName}
            onChange={(changeEvent) => {
              setHasUserNameError(false);
              setUserName(changeEvent.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasUserNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasUserNameError && (
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
              {
                'is-danger': hasEmailError,
              },
            )}
            value={email}
            onChange={(changeEvent) => {
              setHasEmailError(false);
              setEmail(changeEvent.target.value);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailError && (
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
              {
                'is-danger': hasTextError,
              },
            )}
            value={text}
            onChange={(changeEvent) => {
              setHasTextError(false);
              setText(changeEvent.target.value);
            }}
          />
        </div>

        {hasTextError && (
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
              'button',
              'is-link',
              {
                'is-loading': false,
              },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleFormClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
