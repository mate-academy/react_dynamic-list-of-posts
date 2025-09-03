import classNames from 'classnames';
import { ErrorMessages } from '../../types/ErrorMessages';
import { useState } from 'react';

type Props = {
  inputName: string;
  inputEmail: string;
  inputMessage: string;
  handleInputName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onResetForm: () => void;
  handleAddComment: (
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  isLoadingAdd: boolean;
};
export const NewCommentForm: React.FC<Props> = ({
  inputName,
  inputEmail,
  inputMessage,
  handleInputName,
  handleInputEmail,
  handleInputMessage,
  onResetForm,
  handleAddComment,
  isLoadingAdd,
}) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const emptyInputCheck = (input: string) => {
    return input === '' && isSubmitted;
  };

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
            className={classNames('input', {
              'is-danger': emptyInputCheck(inputName),
            })}
            value={inputName}
            onChange={handleInputName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {emptyInputCheck(inputName) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emptyInputCheck(inputName) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorMessages.EmptyName}
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
              'is-danger': emptyInputCheck(inputEmail),
            })}
            value={inputEmail}
            onChange={handleInputEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emptyInputCheck(inputEmail) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emptyInputCheck(inputEmail) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorMessages.EmptyEmail}
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
              'is-danger': emptyInputCheck(inputMessage),
            })}
            value={inputMessage}
            onChange={handleInputMessage}
          />
        </div>
        {emptyInputCheck(inputMessage) && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {ErrorMessages.EmptyMessage}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoadingAdd,
            })}
            onClick={event => {
              setIsSubmitted(true);

              event.preventDefault();
              if (
                !inputName.trim() ||
                !inputEmail.trim() ||
                !inputMessage.trim()
              ) {
                return;
              }

              handleAddComment(setIsSubmitted);
            }}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              setIsSubmitted(false);
              onResetForm();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
