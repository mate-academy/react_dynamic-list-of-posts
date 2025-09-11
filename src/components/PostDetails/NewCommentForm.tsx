import classNames from 'classnames';
import { ErrorMessages } from '../../types/ErrorMessages';
import { useState } from 'react';
import { InputForm } from '../../types/interfaces';

type Props = {
  inputForm: InputForm;
  setInputForm: React.Dispatch<React.SetStateAction<InputForm>>;
  handleAddComment: (
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  isLoadingAdd: boolean;
};
export const NewCommentForm: React.FC<Props> = ({
  inputForm,
  setInputForm,
  handleAddComment,
  isLoadingAdd,
}) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const onResetForm = () => {
    setInputForm({
      name: '',
      email: '',
      body: '',
    });
  };

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
              'is-danger': emptyInputCheck(inputForm.name),
            })}
            value={inputForm.name}
            onChange={event => {
              setInputForm({ ...inputForm, name: event.target.value });
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {emptyInputCheck(inputForm.name) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emptyInputCheck(inputForm.name) && (
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
              'is-danger': emptyInputCheck(inputForm.email),
            })}
            value={inputForm.email}
            onChange={event => {
              setInputForm({ ...inputForm, email: event.target.value });
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emptyInputCheck(inputForm.email) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emptyInputCheck(inputForm.email) && (
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
              'is-danger': emptyInputCheck(inputForm.body),
            })}
            value={inputForm.body}
            onChange={event => {
              setInputForm({ ...inputForm, body: event.target.value });
            }}
          />
        </div>
        {emptyInputCheck(inputForm.body) && (
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
                !inputForm.name.trim() ||
                !inputForm.email.trim() ||
                !inputForm.body.trim()
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
