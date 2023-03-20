import {
  FC,
  ChangeEvent,
  useState,
  FormEvent,
} from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  isLoading: boolean;
  isError: boolean;
  onSubmit: (comment: CommentData) => void;
  commentField: string;
  onCommentChange: (value: string) => void;
  commentFieldError: boolean;
  setCommentError: (status: boolean) => void;
};

export const NewCommentForm: FC<Props> = ({
  isLoading,
  isError,
  onSubmit,
  commentField,
  onCommentChange,
  commentFieldError,
  setCommentError,
}) => {
  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [nameFieldError, setNameFieldError] = useState(false);
  const [emailFieldError, setEmailFieldError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const nameWithoutSpaces = nameField.trim();
    const emailWithoutSpaces = emailField.trim();
    const commentWithoutSpaces = commentField.trim();

    if (!nameWithoutSpaces || !emailWithoutSpaces || !commentWithoutSpaces) {
      if (!nameWithoutSpaces) {
        setNameFieldError(true);
      }

      if (!emailWithoutSpaces) {
        setEmailFieldError(true);
      }

      if (!commentWithoutSpaces) {
        setCommentError(true);
      }

      return;
    }

    const newComment = {
      name: nameField,
      email: emailField,
      body: commentField,
    };

    onSubmit(newComment);
  };

  const handleClearButton = () => {
    setNameFieldError(false);
    setNameField('');
    setEmailFieldError(false);
    setEmailField('');
    setCommentError(false);
    onCommentChange('');
  };

  const handleNameField = (event: ChangeEvent<HTMLInputElement>) => {
    setNameFieldError(false);
    setNameField(event.target.value);
  };

  const handleEmailField = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailFieldError(false);
    setEmailField(event.target.value);
  };

  const handleCommentField = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentError(false);
    onCommentChange(event.target.value);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
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
              { 'is-danger': nameFieldError },
            )}
            value={nameField}
            onChange={handleNameField}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameFieldError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameFieldError && (
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
              { 'is-danger': emailFieldError },
            )}
            value={emailField}
            onChange={handleEmailField}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailFieldError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailFieldError && (
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
              { 'is-danger': commentFieldError },
            )}
            value={commentField}
            onChange={handleCommentField}
          />
        </div>

        {commentFieldError && (
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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      </div>

      {isError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}
    </form>
  );
};
