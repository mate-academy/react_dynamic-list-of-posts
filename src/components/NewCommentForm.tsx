import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  onAddComment: (name: string, email: string, body: string) => Promise<void>,
  isNewCommentLoad: boolean,
  isCommentsUpdate: boolean,
  setIsCommentsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCommentDelete: React.Dispatch<React.SetStateAction<boolean>>,
};

export const NewCommentForm: React.FC<Props> = ({
  onAddComment,
  isNewCommentLoad,
  isCommentsUpdate,
  setIsCommentsUpdate,
  setIsCommentDelete,
}) => {
  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [bodyField, setBodyField] = useState('');
  const [isDangerName, setIsDangerName] = useState(false);
  const [isDangerEmail, setIsDangerEmail] = useState(false);
  const [isDangerTextArea, setIsDangerTextArea] = useState(false);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement> |
    React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setNameField(value);
        setIsDangerName(false);
        break;
      case 'email':
        setEmailField(value);
        setIsDangerEmail(false);
        break;
      case 'body':
        setBodyField(value);
        setIsDangerTextArea(false);
        break;
      default:
        throw new Error('Unknown field');
    }
  };

  const validationFields = () => {
    let validField = true;

    if (!nameField) {
      setIsDangerName(true);
      validField = false;
    }

    if (!emailField) {
      setIsDangerEmail(true);
      validField = false;
    }

    if (!bodyField) {
      setIsDangerTextArea(true);
      validField = false;
    }

    return validField;
  };

  const handleAddButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!isNewCommentLoad && !isCommentsUpdate && validationFields()) {
      setBodyField('');
    }

    if (nameField && emailField && bodyField) {
      onAddComment(
        nameField,
        emailField,
        bodyField,
      );
    }
  };

  const handleClearButton = () => {
    setNameField('');
    setEmailField('');
    setBodyField('');
    setIsDangerName(false);
    setIsDangerEmail(false);
    setIsDangerTextArea(false);
    setIsCommentsUpdate(false);
    setIsCommentDelete(false);
  };

  return (
    <form data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="
          control
          has-icons-left
          has-icons-right"
        >
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(
              'input',
              { 'is-danger': isDangerName },
            )}
            value={nameField}
            onChange={handleOnChange}
          />

          <span className="
            icon
            is-small
            is-left"
          >
            <i className="fas fa-user" />
          </span>

          {isDangerName && (
            <>
              <span
                className={classNames(
                  'icon',
                  'is-small',
                  'is-right',
                  'has-text-danger',
                )}
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Name is required
              </p>
            </>
          )}
        </div>
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="
          control
          has-icons-left
          has-icons-right"
        >
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': isDangerEmail },
            )}
            value={emailField}
            onChange={handleOnChange}
          />

          <span className="
            icon
            is-small
            is-left"
          >
            <i className="fas fa-envelope" />
          </span>

          {isDangerEmail && (
            <>
              <span
                className={classNames(
                  'icon',
                  'is-small',
                  'is-right',
                  'has-text-danger',
                )}
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>

              <p className="help is-danger" data-cy="ErrorMessage">
                Email is required
              </p>
            </>
          )}
        </div>
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
              { 'is-danger': isDangerTextArea },
            )}
            value={bodyField}
            onChange={handleOnChange}
          />
        </div>

        {isDangerTextArea && (
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
              { 'is-loading': isNewCommentLoad },
            )}
            onClick={handleAddButton}
            disabled={isCommentsUpdate}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="button"
            className="
              button
              is-link
              is-light
            "
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      </div>

      {isCommentsUpdate && (
        <div
          className="notification is-danger"
          data-cy="CommentsAddError"
        >
          Unable to add comment. Try again!
        </div>
      )}
    </form>
  );
};
