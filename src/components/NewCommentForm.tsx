import classNames from 'classnames';
import React, { useState } from 'react';

interface NewCommentProps {
  onSubmit: (newComment: { name: string; email: string; body: string }) => void;
}

export const NewCommentForm: React.FC<NewCommentProps> = ({ onSubmit }) => {
  //Name
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  //Email
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  //Tetx
  const [text, setText] = useState('');
  const [hasTextError, setHasTextError] = useState(false);

  const [formLoading, setFormLoading] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    setHasNameError(false);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setHasEmailError(false);
  };

  const handleTextChange = (value: string) => {
    setText(value);
    setHasTextError(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setHasNameError(!name);
    setHasEmailError(!email);
    setHasTextError(!text);

    if (!name.trim() || !email.trim() || !text.trim()) {
      return;
    }

    try {
      setFormLoading(true);

      await onSubmit({ name, email, body: text });
      setText('');
    } finally {
      setFormLoading(false);
    }
  };

  const handleClearButton = () => {
    setText('');
    setEmail('');
    setName('');

    setHasNameError(false);
    setHasEmailError(false);
    setHasTextError(false);
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
            className={`input ${hasNameError ? 'is-danger' : ''}`}
            value={name}
            onChange={e => handleNameChange(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasNameError && (
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
            className={`input ${hasEmailError ? 'is-danger' : ''}`}
            value={email}
            onChange={e => handleEmailChange(e.target.value)}
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
            className={`textarea ${hasTextError ? 'is-danger' : ''}`}
            value={text}
            onChange={e => handleTextChange(e.target.value)}
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
            className={classNames('button is-link', {
              'is-loading': formLoading,
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
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
