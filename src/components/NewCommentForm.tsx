import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';
import PropTypes from 'prop-types';

interface Props {
  onSubmit?: (comment: CommentData) => Promise<void>;
  onClear?: () => void;
}

export const NewCommentForm: React.FC<Props> = ({
  onClear = () => {},
  onSubmit = async () => {},
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [text, setText] = useState('');
  const [textError, setTextError] = useState('');

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [submittingError, setSubmittingError] = useState('');

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError('');
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setTextError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittingError('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedText = text.trim();

    if (trimmedName === '') {
      setNameError('Name is required');
    }

    if (trimmedEmail === '') {
      setEmailError('Email is required');
    }

    if (trimmedText === '') {
      setTextError('Enter some text');
    }

    if (trimmedName === '' || trimmedEmail === '' || trimmedText === '') {
      return;
    }

    setIsSubmiting(true);

    onSubmit({
      name: trimmedName,
      email: trimmedEmail,
      body: trimmedText,
    })
      .then(() => setText(''))
      .catch(() => setSubmittingError('Error while adding comment'))
      .finally(() => setIsSubmiting(false));
  };

  const handleClear = () => {
    setName('');
    setNameError('');

    setEmail('');
    setEmailError('');

    setText('');
    setTextError('');

    onClear();
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
            className={classNames('input', {
              'is-danger': nameError,
            })}
            value={name}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {nameError}
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
            className={classNames('input', {
              'is-danger': emailError,
            })}
            value={email}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {emailError}
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
            className={classNames('textarea', {
              'is-danger': textError,
            })}
            value={text}
            onChange={handleChangeText}
          />
        </div>

        {textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {textError}
          </p>
        )}
      </div>

      {submittingError && (
        <div className="notification is-danger" data-cy="CommentsError">
          {submittingError}
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-primary', {
              'is-loading': isSubmiting,
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
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

NewCommentForm.propTypes = {
  onClear: PropTypes.func,
  onSubmit: PropTypes.func,
};
