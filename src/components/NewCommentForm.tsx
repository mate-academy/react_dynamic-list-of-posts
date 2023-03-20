import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
  onAddComment: (name: string, email: string, body: string) => void,
  isPostNewComment: boolean,
  safeBodyComments: boolean,
};

export const NewCommentForm: FC<Props> = ({
  onAddComment,
  isPostNewComment,
  safeBodyComments,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [bodyTextArea, setBodyTextArea] = useState('');

  const [isValidNameInput, setIsValidNameInput] = useState(true);
  const [isValidEmailInput, setIsValidEmailInput] = useState(true);
  const [isValidTextArea, setIsValidTextAreaInput] = useState(true);

  const hendleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;

    switch (name) {
      case 'name':
        setNameInput(value);
        setIsValidNameInput(true);
        break;

      case 'email':
        setEmailInput(value);
        setIsValidEmailInput(true);
        break;

      default:
        throw new Error('no name in input');
    }
  };

  const hendletInputTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;

    setBodyTextArea(value);
    setIsValidTextAreaInput(true);
  };

  const checkValidField = () => {
    let check = true;

    if (!nameInput) {
      setIsValidNameInput(false);
      check = false;
    }

    if (!emailInput) {
      setIsValidEmailInput(false);
      check = false;
    }

    if (!bodyTextArea) {
      setIsValidTextAreaInput(false);
      check = false;
    }

    return check;
  };

  const clearForm = () => {
    setNameInput('');
    setEmailInput('');
    setBodyTextArea('');
    setIsValidNameInput(true);
    setIsValidEmailInput(true);
    setIsValidTextAreaInput(true);
  };

  const hendlerSubmitButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (!checkValidField()) {
      return;
    }

    onAddComment(nameInput, emailInput, bodyTextArea);
  };

  useEffect(() => {
    if (safeBodyComments) {
      setBodyTextArea('');
    }
  }, [safeBodyComments]);

  return (
    <form data-cy="NewCommentForm">
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
              { 'is-danger': !isValidNameInput },
            )}
            value={nameInput}
            onChange={hendleInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!isValidNameInput && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
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

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(
              'input',
              { 'is-danger': !isValidEmailInput },
            )}
            value={emailInput}
            onChange={hendleInput}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!isValidEmailInput && (
            <>
              <span
                className="icon is-small is-right has-text-danger"
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
              { 'is-danger': !isValidTextArea },
            )}
            value={bodyTextArea}
            onChange={hendletInputTextArea}
          />
        </div>

        {!isValidTextArea && (
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
              { 'is-loading': isPostNewComment },
            )}
            onClick={hendlerSubmitButton}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
