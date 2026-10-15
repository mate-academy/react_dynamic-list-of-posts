import classNames from 'classnames';
import React, { useState } from 'react';
import { addComment } from '../api/comment';
import { Comment } from '../types/Comment';

interface Props {
  postId: number;
  onAddComment: (newComment: Comment) => void;
  handleError: () => void;
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onAddComment,
  handleError,
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [text, setText] = useState('');
  const [textError, setTextError] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nameIsEmpty = !name.trim();
    const emailIsEmpty = !email.trim();
    const textIsEmpty = !text.trim();

    setNameError(nameIsEmpty);
    setEmailError(emailIsEmpty);
    setTextError(textIsEmpty);
    if (nameIsEmpty || emailIsEmpty || textIsEmpty) {
      return;
    }

    const newCommentData = {
      postId,
      name: name.trim(),
      email: email.trim(),
      body: text.trim(),
    };

    setIsSaving(true);
    addComment(newCommentData)
      .then(response => {
        onAddComment(response);
        setText('');
      })
      .catch(handleError)
      .finally(() => {
        setIsSaving(false);
      });
  };

  const onClear = () => {
    setName('');
    setNameError(false);

    setEmail('');
    setEmailError(false);

    setText('');
    setTextError(false);
  };

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    handleFieldError: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setValue(event.target.value);
    handleFieldError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
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
            className={classNames('input', { 'is-danger': Boolean(nameError) })}
            value={name}
            onChange={event => handleFieldChange(event, setName, setNameError)}
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
            className={classNames('input', {
              'is-danger': Boolean(emailError),
            })}
            value={email}
            onChange={event =>
              handleFieldChange(event, setEmail, setEmailError)
            }
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
            className={classNames('textarea', {
              'is-danger': Boolean(textError),
            })}
            value={text}
            onChange={event => handleFieldChange(event, setText, setTextError)}
          />
        </div>

        {textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': isSaving })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={onClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
